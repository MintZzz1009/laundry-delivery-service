const express = require('express');
const jwt = require('jsonwebtoken');

// 페이지 이동 후 GET 요청시 실행되는 미들웨어
// Refresh Token과 Access Token을 검증하는 API
module.exports = async (req, res, next) => {
    console.log('/user/me 라우터 실행');
    const accessToken = req.cookies.accessToken;
    console.log(`accessToken: ${accessToken}`);
    const refreshToken = req.cookies.refreshToken;

    // accessToken 없을 경우
    if (!accessToken) {
        console.log('accessToken 없을 경우');
        return res.status(401).json({ errorMessage: 'No accessToken' });
    }
    //.json({ message: 'accessToken 없음. 로그인 후 이용 바람. 로그인 페이지로 이동.' })

    const isAccessTokenValidate = validate(accessToken);
    console.log(`isAccessTokenValidate: ${isAccessTokenValidate}`);
    const isRefreshTokenValidate = validate(refreshToken);
    console.log(`isRefreshTokenValidate: ${isRefreshTokenValidate}`);

    // accessToken 만료시 refreshToken 통해서 재발급
    if (!isAccessTokenValidate) {
        console.log('accessToken 만료시 refreshToken 통해서 재발급');
        // refreshToken 없을 경우 -> 로그인 통한 토큰 재발급 유도
        if (!refreshToken) {
            console.log(
                'refreshToken 없을 경우 -> 로그인 통한 토큰 재발급 유도'
            );
            return res
                .status(401)
                .json({ errorMessage: 'Expired accessToken' });
            // .status(400).json({message:'No refreshToken. Please us. 로그인 페이지로 이동.',})
        }

        // refreshToken 만료시 -> 재로그인 통한 토큰 재발급 유도
        if (!isRefreshTokenValidate) {
            console.log(
                'refreshToken 만료시 -> 재로그인 통한 토큰 재발급 유도'
            );
            return res
                .status(401)
                .json({ errorMessage: 'Expired refreshToken' });
            // .status(400).json({message:'refreshToken 만료. 재로그인 후 이용 바람. 로그인 페이지로 이동.'})
        }

        // refreshToken 존재 & 유효 -> 새로운 accessToken 재발급
        let tokenObject = {};
        console.log('accessToken 재발급 전, tokenObject 확인');
        console.log(`토큰 발급 전: ${tokenObject}`);
        const accessTokenId = tokenObject[refreshToken];
        console.log(`토큰 발급 후: ${tokenObject}`);
        return res.status(201).json({
            result: 'success',
            message: 'Create new accessToken through existed refreshToken',
            accessTokenId,
        });
    }

    // accessToken 있을 경우
    const accessTokenId = getAccessTokenId(accessToken);
    console.log('accessToken 있을 경우');
    return res.status(200).json({
        result: 'success',
        message: `accessToken existed`,
        accessTokenId,
    });
};

require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET;

// 사용자의 name의 정보를 가진 accessToken과 refreshToken을 생성한 후, 쿠키에 저장합니다.
function issueTokens(accessTokenId) {
    const accessToken = createAccessToken(accessTokenId);
    const refreshToken = createRefreshToken();

    tokenObject[refreshToken] = accessTokenId; // Refresh Token을 가지고 해당 유저의 정보를 서버에 저장합니다.
    return { accessToken, refreshToken };
}

// Access Token을 생성합니다.
function createAccessToken(id) {
    const accessToken = jwt.sign(
        { id }, // JWT 데이터
        JWT_SECRET_KEY, // 비밀키
        {
            expiresIn: '15m',
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
            expiresIn: '1h',
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
function getAccessTokenId(accessToken) {
    try {
        const accessTokenId = jwt.verify(accessToken, JWT_SECRET_KEY); // JWT에서 Payload를 가져옵니다.
        return accessTokenId;
    } catch (error) {
        return null;
    }
}
