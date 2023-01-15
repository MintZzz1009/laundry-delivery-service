const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) => {
    res.render('login', { title: '로그인' });
});

router.post('/login', (req, res, next) => {
    const { input_id, input_pw } = req.body;
    console.log(req.body);
    const result = 'success'; // wrong_pw, fail
    res.status(201).json({ msg: result, input_id, input_pw });
    res.render('login');
});

module.exports = router;
