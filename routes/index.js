const express = require('express');
const router = express.Router();

const mainPostRouter = require('./routes.main');
const reviewPostRouter = require('./routes.review.post');
const reviewsRouter = require('./routes.reviews');
const ordersRouter = require('./routes.orders');
const signUpRouter = require('./routes.signup');
const logInRouter = require('./routes.login');
const myPageRouter = require('./routes.mypage');
const logOutRouter = require('./routes.logout');
const testRouter = require('./test');

const authMiddleware = require('../middlewares/auth.middleware');

router.use([
    reviewPostRouter,
    reviewsRouter,
    testRouter,
    ordersRouter,
    myPageRouter,
    logInRouter,
    logOutRouter,
]);

router.use('/main', mainPostRouter);
router.use('/login', logInRouter); // - /user | /store
router.use('/signup', signUpRouter); // - /user | /store

// authMiddleware
router.get('/users/me', authMiddleware);

module.exports = router;
