const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, User, SpotImage, ReviewImage, Booking, sequelize } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const user = require('../../db/models/user');
const e = require('express');
const booking = require('../../db/models/booking');

//--------------------------- GET all spots
router.get('/', async (req, res, next) => {
    let pagination = {}
    let { page, size } = req.query

    if (!page) {
        page = 1
        pagination.offset = size * (page - 1)
    }
    if (!size || size > 20) {
        size = 20
        pagination.limit = size
    }

    //pagination error handler
    let errorObj = {}
    if (page <= 0 || isNaN(page)) {
        errorObj.page = "Page must be greater than or equal to 1"
    }
    if (size <= 0 || isNaN(size)) {
        errorObj.size = "Size must be greater than or equal to 1"
    }

    if (Object.keys(errorObj).length) {
        let err = new Error("Validation Error")
        err.status = 400
        err.errors = errorObj
        return next(err)
    }

    if (page > 10) {
        page = 10
        pagination.offset = size * (page - 1)
    }

    if (size >= 1 && size <= 20) {
        size = parseInt(size)
        pagination.limit = size
    }
    if (page >= 1 && page <= 10) {
        page = parseInt(page)
        pagination.offset = size * (page - 1)
    }


    const spots = await Spot.findAll({
        ...pagination,
    })

    let spotsList = []

    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    })

    for (let spot of spotsList) {
        const rating = await Review.findAll({
            where: {
                spotId: spot.id
            },
            attributes: [
                [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]
            ]
        })

        spot.avgRating = rating[0].dataValues.avgRating

        const previewImage = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            },
            attributes: ["url"]
        })

        if (!previewImage) {
            spot.previewImage = "No preview image found"
        } else {
            spot.previewImage = previewImage.url
        }
    }

    let returnObj = {}
    returnObj.Spots = spotsList
    returnObj.page = page
    returnObj.size = size


    return res.json(returnObj)
})

//--------------------------- GET all spots by the Current User
router.get('/current', async (req, res, next) => {
    if (!req.user) {
        let err = new Error("Authentication required")
        err.status = 401
        return next(err)

    } else {
        const spots = await Spot.findAll({
            where: {
                ownerId: req.user.id
            }
        })

        for (let spot of spots) {
            const rating = await Review.findAll({
                where: {
                    spotId: spot.toJSON().id
                },
                attributes: [
                    [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]
                ]
            })

            const previewImage = await SpotImage.findOne({
                where: {
                    spotId: spot.toJSON().id,
                    preview: true
                },
                attributes: ["url"]
            })

            spot.dataValues.avgRating = rating[0].dataValues.avgRating

            if (!previewImage) {
                spot.dataValues.previewImage = "No preview image found"
            } else {
                spot.dataValues.previewImage = previewImage.dataValues.url
            }
        }
        return res.json(spots)
    }
})

//--------------------------- GET details of Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spotInfo = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: SpotImage,
                attributes: ["id", "url", "preview"]
            },
            {
                model: User,
                as: 'Owner',
                attributes: ["id", "firstName", "lastName"]
            }
        ]
    })

    const rating = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        attributes: [
            [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]
        ]
    })

    const reviews = await Review.count({
        where: {
            spotId: req.params.spotId
        }
    })

    if (!spotInfo) {
        let err = new Error("Spot couldn't be found")
        err.status = 404

        next(err)
    } else {
        spotInfo.dataValues.numReviews = reviews;
        spotInfo.dataValues.avgStarRating = rating[0].dataValues.avgRating;
        return res.json(spotInfo)
    }
})

//--------------------------- POST create spot
router.post('/', requireAuth, async (req, res, next) => {

    let possibleErrors = {
        address: "Street address is required",
        city: "City is required",
        state: "State is required",
        country: "Country is required",
        lat: "Latitude is not valid",
        lng: "Longitude is not valid",
        name: "Name must be less than 50 characters",
        description: "Description is required",
        price: "Price per day is required"
    }

    let errorObj = {}

    for (let key in possibleErrors) {
        if (!req.body[key] || req.body[key] === "") {
            errorObj[key] = possibleErrors[key]
        }
        if ((key === "lat" || key === "lng") && typeof req.body[key] !== "number") {
            errorObj[key] = possibleErrors[key]
        }
        if (key === "name" && req.body[key].length > 50) {
            errorObj[key] = possibleErrors[key]
        }
    }

    if (Object.keys(errorObj).length) {
        let err = new Error("Validation Error")
        err.status = 400
        err.errors = errorObj
        return next(err)
    }

    const newSpot = await Spot.create({
        ownerId: req.user.id,
        ...req.body
    })

    return res.json(newSpot)
})

//--------------------------- POST add image by spotId
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId,
        }
    })

    if (!spot) {
        let err = new Error("Spot couldn't be found")
        err.status = 404
        return next(err)
    }

    if (req.user.id !== spot.toJSON().ownerId) {
        let err = new Error("Forbidden")
        err.status = 403
        return next(err)
    }

    const createImage = await SpotImage.create({
        spotId: spot.toJSON().id,
        ...req.body
    })

    const newImage = await SpotImage.findAll({
        order: [["id", "DESC"]],
        limit: 1,
        // attributes: ["id", "url", "preview"]
    })

    return res.json(newImage)

})

//--------------------------- PUT edit a spot
router.put('/:spotId', requireAuth, async (req, res, next) => {
    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId,
            ownerId: req.user.id
        }
    })

    if (!spot) {
        let err = new Error("Spot couldn't be found")
        err.status = 404
        return next(err)
    } else {

        let possibleErrors = {
            address: "Street address is required",
            city: "City is required",
            state: "State is required",
            country: "Country is required",
            lat: "Latitude is not valid",
            lng: "Longitude is not valid",
            name: "Name must be less than 50 characters",
            description: "Description is required",
            price: "Price per day is required"
        }

        let errorObj = {}

        for (let key in possibleErrors) {
            if (!req.body[key] || req.body[key] === "") {
                errorObj[key] = possibleErrors[key]
            }
            if ((key === "lat" || key === "lng") && typeof req.body[key] !== "number") {
                errorObj[key] = possibleErrors[key]
            }
            if (key === "name" && req.body[key].length > 50) {
                errorObj[key] = possibleErrors[key]
            }
        }

        if (Object.keys(errorObj).length) {
            let err = new Error("Validation Error")
            err.status = 400
            err.errors = errorObj
            return next(err)
        }

        const editSpot = await spot.update({
            ...req.body
        })

        return res.json(editSpot)
    }
})

//--------------------------- DELETE a spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId,
            ownerId: req.user.id
        }
    })

    if (!spot) {
        let err = new Error("Spot couldn't be found")
        err.status = 404
        return next(err)
    } else {
        await spot.destroy()
        res.status(200)
        return res.json({
            message: "Successfully deleted",
            statusCode: res.statusCode
        })
    }
})

//--------------------------- GET all reviews by spotId
router.get('/:spotId/reviews', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: Review,
                include: [
                    {
                        model: User,
                        attributes: ["id", "firstName", "lastName"]
                    },
                    {
                        model: ReviewImage,
                        attributes: ["id", "url"]
                    }
                ]
            },
        ]
    })

    if (!spot) {
        let err = new Error("Spot couldn't be found")
        err.status = 404
        return next(err)

    } else {
        const spotReviews = {};
        spotReviews.Reviews = spot.Reviews

        return res.json(spotReviews)
    }
})

//--------------------------- POST create review by spotId
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: Review
            }
        ]
    })

    if (!spot) {
        let err = new Error("Spot couldn't be found")
        err.status = 404
        return next(err)
    }

    let reviewJson = spot.toJSON().Reviews

    for (let review of reviewJson) {
        if (review.userId === req.user.id) {
            let err = new Error("User already has a review for this spot")
            err.status = 403
            return next(err)
        }
    }

    // req.body error handler
    let possibleErrors = {
        review: "Review text is required",
        stars: "Stars must be an integer from 1 to 5"
    }

    let errorObj = {}
    let ratings = [1, 2, 3, 4, 5]

    for (let key in possibleErrors) {
        if (!req.body[key] || req.body[key] === "") {
            errorObj[key] = possibleErrors[key]
        }
        if (key === "stars" && (!Number.isInteger(req.body[key]) || !ratings.includes(req.body[key]))) {
            errorObj[key] = possibleErrors[key]
        }
    }

    if (Object.keys(errorObj).length) {
        let err = new Error("Validation Error")
        err.status = 400
        err.errors = errorObj
        return next(err)
    }

    const newReview = await Review.create({
        spotId: spot.toJSON().id,
        userId: req.user.id,
        ...req.body
    })

    return res.json(newReview)

})

//--------------------------- GET bookings based on spotId
router.get('/:spotId/bookings', async (req, res, next) => {
    if (!req.user) {
        let err = new Error("Authentication required")
        err.status = 401
        return next(err)
    }

    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId,
        }
    })

    if (!spot) {
        let err = new Error("Spot couldn't be found")
        err.status = 404
        return next(err)
    }

    let bookingsList = []

    if (req.user.id !== spot.toJSON().ownerId) {
        const bookings = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            },
            attributes: ["spotId", "startDate", "endDate"]
        })

        bookings.forEach(booking => {
            bookingsList.push(booking.toJSON())
        })
    } else {
        const bookings = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            }
        })

        bookings.forEach(booking => {
            bookingsList.push(booking.toJSON())
        })

        const user = await User.findByPk(req.user.id, {
            attributes: ["id", "firstName", "lastName"]
        })

        bookingsList.forEach(booking => {
            booking.User = user.toJSON()
        })
    }

    let returnObj = {}
    returnObj.Bookings = bookingsList

    return res.json(returnObj)
})

//--------------------------- POST create booking from spotId
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        let err = new Error("Spot couldn't be found")
        err.status = 404
        return next(err)
    }
    if (req.user.id === spot.toJSON().id) {
        let err = new Error("Forbidden")
        err.status = 403
        return next(err)
    }

    let { startDate, endDate } = req.body
    let bodyStartMS = Date.parse(startDate)
    let bodyEndMS = Date.parse(endDate)

    //req.body error handler
    let errorObj = {}

    if (!bodyStartMS || bodyStartMS === "") {
        errorObj.startDate = "Please enter valid startDate"
    }
    if (!bodyEndMS || bodyEndMS === "") {
        errorObj.endDate = "Please enter valid endDate"
    }

    if (Object.keys(errorObj).length) {
        let err = new Error("Invalid Date Range")
        err.status = 403
        err.errors = errorObj
        return next(err)
    }

    if (bodyStartMS >= bodyEndMS) {
        let err = new Error("Validation error")
        err.status = 400
        err.errors = {
            endDate: "endDate cannot be on or before startDate"
        }
        return next(err)
    }

    const bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        }
    })

    // req.body conflict error handler
    for (let booking of bookings) {
        let bookingJson = booking.toJSON()
        let bookingStartMS = Date.parse(bookingJson.startDate)
        let bookingEndMS = Date.parse(bookingJson.endDate)

        if (bodyStartMS >= bookingStartMS && bodyStartMS <= bookingEndMS) {
            errorObj.startDate = "Start date conflicts with an existing booking"
        }
        if (bodyEndMS >= bookingStartMS && bodyEndMS <= bookingEndMS) {
            errorObj.endDate = "End date conflicts with an existing booking"
        }
        if (bodyStartMS < bookingStartMS && bodyEndMS > bookingEndMS) {
            errorObj.endDate = "End date conflicts with an existing booking"
            errorObj.startDate = "Start date conflicts with an existing booking"
        }
    }

    if (Object.keys(errorObj).length) {
        let err = new Error("Sorry, this spot is already booked for the specified dates")
        err.status = 403
        err.errors = errorObj
        return next(err)
    }

    let newBooking = await Booking.create({
        spotId: spot.toJSON().id,
        userId: req.user.id,
        ...req.body
    })

    return res.json(newBooking)
})

module.exports = router;
