const express = require('express');
const router = express.Router();

const mainPostRouter = require('./routes.main');
const reviewPostRouter = require('./routes.review.post');
const reviewsRouter = require('./routes.reviews');
const signUpRouter = require('./routes.signup');
const logInRouter = require('./routes.login');
const testRouter = require('./test');

const authMiddleware = require('../middlewares/auth.middleware');

router.use('/', [reviewPostRouter, reviewsRouter, testRouter]);

router.use('/main', mainPostRouter);
router.use('/login', logInRouter);
router.use('/signup', signUpRouter);

// authMiddleware
router.get('/users/me', authMiddleware, async (req, res) => {
    res.json({ result: 'success', user: res.locals.user });
});

module.exports = router;
