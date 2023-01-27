const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, User, SpotImage, ReviewImage, sequelize } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const user = require('../../db/models/user');
const e = require('express');

// GET all Reviews of current user
router.get('/current', async (req, res, next) => {
    if (!req.user) {
        let err = new Error("Please log in")
        return next(err)
    }

    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },
        ]
    })

    let reviewsList = []

    reviews.forEach((review) => {
        let reviewJson = review.toJSON()
        reviewsList.push(reviewJson)
    });

    for (let review of reviewsList) {
        const spot = await Spot.findOne({
            where: { id: review.spotId },
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price']
        })

        review.Spot = spot

        const previewImg = await SpotImage.findOne({
            where: {
                spotId: review.spotId,
                preview: true
            },
            attributes: ['url']
        })

        if (previewImg) {
            review.Spot.dataValues.previewImage = previewImg.dataValues.url
        } else {
            review.Spot.dataValues.previewImage = "no preview image"

        }

        const reviewImg = await ReviewImage.findAll({
            where: {
                reviewId: review.id,
            },
            attributes: ['id', 'url']
        })

        review.ReviewImages = reviewImg
    }

    const returnObj = {}
    returnObj.Reviews = reviewsList

    return res.json(returnObj)
})



module.exports = router;
