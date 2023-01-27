const express = require('express');
const router = express.Router();

router.get('/mypage', async (req, res, next) => {
    res.render('mypage', { title: '마이페이지' });
});

module.exports = router;
