const express = require('express');
const router = express.Router();

router.get('/signup', (req, res, next) => {
    res.render('signup', { title: '회원가입' });
});

module.exports = router;
