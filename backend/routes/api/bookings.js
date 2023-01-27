const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, User, SpotImage, ReviewImage, Booking, sequelize } = require('../../db/models');
const { Op } = require("sequelize");

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const user = require('../../db/models/user');
const e = require('express');

//--------------------------- GET all current user booking
router.get('/current', async (req, res, next) => {
    if (!req.user) {
        let err = new Error("Authentication required")
        err.status = 401
        return next(err)
    }

    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        }
    })

    let bookingsList = []
    bookings.forEach(booking => {
        bookingsList.push(booking.toJSON())
    })

    for (let booking of bookingsList) {
        const spot = await Spot.scope('currentSpotnoDesc').findOne({
            where: { id: booking.spotId },
        })

        booking.Spot = spot

        const previewImg = await SpotImage.findOne({
            where: {
                spotId: booking.spotId,
                preview: true
            },
            attributes: ['url']
        })

        if (previewImg) {
            booking.Spot.dataValues.previewImage = previewImg.dataValues.url
        } else {
            booking.Spot.dataValues.previewImage = "no preview image"
        }
    }

    const returnObj = {}
    returnObj.Bookings = bookingsList

    return res.json(returnObj)
})

//--------------------------- PUT edit booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId)

    if (!booking) {
        let err = new Error("Booking couldn't be found")
        err.status = 404
        return next(err)
    }
    if (req.user.id !== booking.toJSON().userId) {
        let err = new Error("Forbidden")
        err.status = 403
        return next(err)
    }

    let bookingEndDateMS = Date.parse(booking.toJSON().endDate)
    let nowMS = Date.now()

    if (bookingEndDateMS <= nowMS) {
        let err = new Error("Past bookings can't be modified")
        err.status = 403
        return next(err)
    }

    // req.body error handler
    let { startDate, endDate } = req.body
    let bodyStartMS = Date.parse(startDate)
    let bodyEndMS = Date.parse(endDate)

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

    // req.body conflict error handler
    const bookings = await Booking.findAll({
        where: {
            spotId: booking.toJSON().spotId,
            id: {
                [Op.ne]: req.params.bookingId
            }
        }
    })

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

    const editBooking = await booking.update({
        ...req.body
    })

    const updatedBooking = await Booking.findByPk(req.params.bookingId)

    return res.json(updatedBooking)
})

//--------------------------- DELETE booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId)

    if (!booking) {
        let err = new Error("Booking couldn't be found")
        err.status = 404
        return next(err)
    }
    if (req.user.id !== booking.userId) {
        let err = new Error("Forbidden")
        err.status = 403
        return next(err)
    }

    let startdateMS = Date.parse(booking.startDate)
    let enddateMS = Date.parse(booking.endDate)
    let nowMS = Date.now()

    if (startdateMS <= nowMS && enddateMS >= nowMS) {
        let err = new Error("Bookings that have been started can't be deleted")
        err.status = 403
        return next(err)
    }

    await booking.destroy()
    res.status(200)

    return res.json({
        message: "Successfully deleted",
        statusCode: res.statusCode
    })

})

module.exports = router;
