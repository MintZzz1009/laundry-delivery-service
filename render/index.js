const express = require('express');
const router = express.Router();

router.get('/api/main', (req, res, next) => {
    console.log('app.js 실행 => app.get("/")');
    // jwt 토큰 검사 -> login 값 변경
    res.render('main', {
        login: false,
        title: '코딩할 팔자',
        mode: 'light',
    });
});

router.get('/api/signup/user', (req, res, next) => {
    res.render('signup', { title: '회원가입', formType: false });
});

router.get('/api/signup/store', (req, res, next) => {
    res.render('signup', { title: '회원가입', formType: true });
});

router.get('/api/login', (req, res, next) => {
    res.render('login', { title: '로그인' });
});

module.exports = router;
