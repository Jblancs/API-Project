// backend/routes/api/users.js
const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Invalid email'),

    check('username')
        .notEmpty()
        .withMessage('Username is required'),

    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),

    check('firstName')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a firstname with at least 4 characters.'),

    check('lastName')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a lastname with at least 4 characters.'),

    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
        const { email, password, username, firstName, lastName } = req.body;

        const user = await User.signup({ email, username, password, firstName, lastName });

        let token = await setTokenCookie(res, user);

        return res.json({
            user: {
                ...user.toJSON(),
                token: token
            }
        });
    }
);


module.exports = router;
