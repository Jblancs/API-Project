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

    spotInfo.dataValues.avgStarRating = rating[0].dataValues.avgRating

    if (!spotInfo) {
        let err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
    } else {
        res.json(spotInfo)
    }

})

module.exports = router;
