const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, User, SpotImage, ReviewImage, Booking, sequelize } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const user = require('../../db/models/user');
const e = require('express');

// GET all current user booking
router.get('/current', async (req, res, next) => {
    if (!req.user) {
        let err = new Error("Please log in")
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
        const spot = await Spot.findOne({
            where: { id: booking.spotId },
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
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

module.exports = router;
