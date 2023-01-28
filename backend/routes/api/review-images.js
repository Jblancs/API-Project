const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, User, SpotImage, ReviewImage, Booking, sequelize } = require('../../db/models');
const { Op } = require("sequelize");

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const user = require('../../db/models/user');
const e = require('express');

//--------------------------- DELETE ReviewImages
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const image = await ReviewImage.findByPk(req.params.imageId, {
        include: {
            model: Review,
            attributes: ["userId"]
        }
    })

    if (!image) {
        let err = new Error("Spot Image couldn't be found")
        err.status = 404
        return next(err)
    }
    if (req.user.id !== image.Review.userId) {
        let err = new Error("Forbidden")
        err.status = 403
        return next(err)
    }

    await image.destroy()
    res.status(200)

    return res.json({
        message: "Successfully deleted",
        statusCode: res.statusCode
    })
})

module.exports = router;
