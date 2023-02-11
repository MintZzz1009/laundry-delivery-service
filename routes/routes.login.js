const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const { User, Store } = require('../models');
const { Op } = require('sequelize');
const { token } = require('morgan');
const JWT_SECRET_KEY = process.env.JWT_SECRET;

router.get('/', async (req, res, next) => {
    res.render('login', { title: '로그인' });
});

let tokenObject = {
    // key(= refreshToken): value(= accessToken )
};
router.post('/user', async (req, res, next) => {
    const { nickname, password } = req.body;

    console.log(
        '@@@@@@@@@@@@@@@@',
        `nickname: ${nickname}`,
        `password: ${password}`
    );
    try {
        const userId = await User.findOne({
            where: { [Op.and]: [{ nickname }, { password }] },
        });
        if (userId === null) {
            return res.json({ msg: 'fail' });
        }
        // 토큰(access, refresh) 발급
        const tokens = issueTokens(nickname);
        res.cookie('accessToken', tokens.accessToken); // Access Token을 Cookie에 전달한다.
        res.cookie('refreshToken', tokens.refreshToken); // Refresh Token을 Cookie에 전달한다.
        res.cookie('loginType', 'user');
        // cookie에 닉네임 저장
        res.cookie('nickname', nickname);
        return res.json({ msg: 'success' });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/store', async (req, res, next) => {
    const { store_name, password } = req.body;
    console.log(`@@@@@@@ store_name: ${store_name}, password: ${password}`);
    try {
        const storeId = await Store.findOne({
            where: { [Op.and]: [{ store_name }, { password }] },
        });
        if (storeId === null) {
            return res.json({ msg: 'fail' });
        }

        // 토큰(access, refresh) 발급
        const accessTokenId = store_name;
        const tokens = issueTokens(accessTokenId);
        console.log(tokenObject);
        res.cookie('accessToken', tokens.accessToken); // Access Token을 Cookie에 전달한다.
        res.cookie('refreshToken', tokens.refreshToken); // Refresh Token을 Cookie에 전달한다.
        res.cookie('loginType', 'store');
        // cookie에 닉네임 저장
        res.cookie('nickname', nickname);
        return res.json({ msg: 'success' });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 이제 프론트에서 토큰 검증 후에 접근 허가해주는 로직 짜야함.
// 페이지 이동할 때 이거 미들웨어로 넣고, ajax 응답 성공하면 페이지 이동 라우터 호출.

// 사용자의 name과 login_type, dark_mode 등의 정보를 가진 accessToken과 refreshToken을 생성한 후, 쿠키에 저장합니다.
function issueTokens(nickname) {
    const accessToken = createAccessToken(nickname);
    const refreshToken = createRefreshToken();

    tokenObject[refreshToken] = nickname; // Refresh Token을 가지고 해당 유저의 정보를 서버에 저장합니다.
    return { accessToken, refreshToken };
}

// Access Token을 생성합니다.
function createAccessToken(nickname) {
    const accessToken = jwt.sign(
        { nickname }, // JWT 데이터
        JWT_SECRET_KEY, // 비밀키
        {
            expiresIn: '10s',
            // iss: "haksoo's laundry_delivery service",
            // sub: 'access_token',
        }
    ); // Access Token이 7초 뒤에 만료되도록 설정합니다.

    return accessToken;
}

// Refresh Token을 생성합니다.
function createRefreshToken() {
    const refreshToken = jwt.sign(
        {}, // JWT 데이터
        JWT_SECRET_KEY, // 비밀키
        {
            expiresIn: '30s',
            // iss: "haksoo's laundry_delivery service",
            // sub: 'refresh_token',
        }
    ); // Refresh Token이 3분 뒤에 만료되도록 설정합니다.

    return refreshToken;
}

// Refresh Token이나 Access Token을 검증합니다.
function validate(Token) {
    try {
        jwt.verify(Token, JWT_SECRET_KEY); // JWT를 검증합니다.
        return true;
    } catch (error) {
        return false;
    }
}

// Access Token의 Payload를 가져옵니다.
function getAccessTokenPayload(accessToken) {
    try {
        const payload = jwt.verify(accessToken, JWT_SECRET_KEY); // JWT에서 Payload를 가져옵니다.
        return payload;
    } catch (error) {
        return null;
    }
}

module.exports = router;
