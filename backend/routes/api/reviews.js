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
        err.status = 401
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
        const spot = await Spot.scope('currentSpotnoDesc').findOne({
            where: { id: review.spotId }
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

// POST add image to review based on review id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId)

    if (!review) {
        let err = new Error("Review couldn't be found")
        err.status = 404
        return next(err)
    }
    if (req.user.id !== review.toJSON().userId) {
        let err = new Error("Can only add image to your own review")
        err.status = 400
        return next(err)
    }

    const imgCount = await ReviewImage.count({
        where: {
            reviewId: req.params.reviewId
        }
    })

    if (imgCount > 10) {
        let err = new Error("Maximum number of images for this resource was reached")
        err.status = 403
        return next(err)
    }

    if (!req.body.url || req.body.url === "") {
        let err = new Error("Please include url")
        err.status = 400
        return next(err)
    }

    const createImg = await ReviewImage.create({
        reviewId: review.toJSON().id,
        ...req.body
    })

    const newReviewImg = await ReviewImage.findByPk(createImg.toJSON().id, {
        attributes: ["id", "url"]
    })

    return res.json(newReviewImg)
})

// PUT edit a review
router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId)

    if (!review) {
        let err = new Error("Review couldn't be found")
        err.status = 404
        return next(err)
    }
    if (req.user.id !== review.toJSON().userId) {
        let err = new Error("Can only edit your own review")
        err.status = 400
        return next(err)
    }

    //req.body error handler
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

    const editReview = await review.update({
        ...req.body
    })

    return res.json(editReview)
})

// DELETE a review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId)

    if (!review) {
        let err = new Error("Review couldn't be found")
        err.status = 404
        return next(err)
    }
    if (req.user.id !== review.toJSON().userId) {
        let err = new Error("Can only edit your own review")
        err.status = 400
        return next(err)
    }

    await review.destroy()
    res.status(200)
    return res.json({
        message: "Successfully deleted",
        statusCode: res.statusCode
    })
})

module.exports = router;
