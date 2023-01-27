const express = require('express');
const router = express.Router();

router.get('/api/main', (req, res, next) => {
    console.log('app.js 실행 => app.get("/")');
    // jwt 토큰 검사 -> login 값 변경
    const loginType = req.cookies.loginType;
    const mode = req.cookies.mode;
    console.log(loginType);
    res.render('main', {
        title: '코딩할 팔자',
        loginType,
        mode,
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

router.get('/api/apply', async (req, res, next) => {
    res.render('apply', { title: '세탁 신청하기' });
});

router.get('/api/orders', async (req, res, next) => {
    res.render('orders', { title: '세탁물 신청 목록' });
});

router.get('/api/user/review', async (req, res, next) => {
    res.render('review-post', {
        title: '리뷰 작성하기',
        customer_nickname: '더러운빨래가너무많아요', // DB 적용
        store_nickname: '새하얗게빨아주는세탁소', // DB 적용
    });
});

router.get('/storeId/reviewId', async (req, res) => {
    res.render('reviews', {
        title: '리뷰 조회하기',
        login_type: '사장님',
        store_nickname: '현빈정도는 뺨 10대 치는 장빈 세탁소',
        review_userNickname: '손님닉네임은 수염민희찬님은미남',
        review_createdAt: '2022-12-27 14:00', // DB 유
        review_category: '카테고리는 상의로 해볼까여',
        review_star: 4, // DB 유
        review_content:
            '아주 깨끗하고 좋아요! 완전 새하얗게 되었는데 정말 감사합니다. 다음에는 누렇게 된 와이셔츠랑 흰 옷들을 모두 맡겨야겠어요! 흰 신발까지도요 ㅎㅎ.', // DB 유
        review_image: 'PATH', // DB 유
    });
});

module.exports = router;
