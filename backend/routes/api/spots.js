const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, User, SpotImage, sequelize } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const user = require('../../db/models/user');
const e = require('express');

// GET all spots
router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll()

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
})

// GET all spots by the Current User
router.get('/current', async (req, res, next) => {
    if (!req.user) {
        let err = new Error("Please log in")
        next(err)

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

// GET details of Spot from an id
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

// POST create spot
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

// POST add image by spotId
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
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
        const createImage = await SpotImage.create({
            spotId: req.params.spotId,
            ...req.body
        })

        const newImage = await SpotImage.findAll({
            order: [["id", "DESC"]],
            limit: 1,
            attributes: ["id", "url", "preview"]
        })

        return res.json(newImage)
    }
})

// PUT edit a spot
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

        res.json(editSpot)
    }
})

module.exports = router;
