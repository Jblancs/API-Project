const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, ReviewImage, SpotImage, sequelize } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const user = require('../../db/models/user');

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

        console.log(previewImage)

        spot.dataValues.avgRating = rating[0].dataValues.avgRating

        if (!previewImage) {
            spot.dataValues.previewImage = "No preview image found"
        } else {
            spot.dataValues.previewImage = previewImage.dataValues.url
        }

    }

    res.json(spots)

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

            console.log(previewImage)

            spot.dataValues.avgRating = rating[0].dataValues.avgRating

            if (!previewImage) {
                spot.dataValues.previewImage = "No preview image found"
            } else {
                spot.dataValues.previewImage = previewImage.dataValues.url
            }

        }

        res.json(spots)
    }

})

// GET

module.exports = router;
