const express = require('express');
const router = express.Router();

router.get('/logout', (req, res, next) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.clearCookie('loginType');
    res.status(200).json({ message: 'logout! Go to mainpage' });
});

module.exports = router;
