const express = require('express');
const jwt = require('jsonwebtoken');

// 페이지 이동 후 GET 요청시 실행되는 미들웨어
// Refresh Token과 Access Token을 검증하는 API
module.exports = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // accessToken 없을 경우
    if (!accessToken)
        return res
            .status(400)
            .json({
                message:
                    'accessToken 없음. 로그인 후 이용 바람. 로그인 페이지로 이동.',
            })
            .redirect('/api/login');

    const isAccessTokenValidate = validate(accessToken);
    const isRefreshTokenValidate = validate(refreshToken);

    // accessToken 만료시 refreshToken 통해서 재발급
    if (!isAccessTokenValidate) {
        // refreshToken 없을 경우 -> 로그인 통한 토큰 재발급 유도
        if (!refreshToken) {
            return res
                .status(400)
                .json({
                    message:
                        'No refreshToken. Please us. 로그인 페이지로 이동.',
                })
                .redirect('/api/login');
        }

        // refreshToken 만료시 -> 재로그인 통한 토큰 재발급 유도
        if (!isRefreshTokenValidate) {
            return res
                .status(400)
                .json({
                    message:
                        'refreshToken 만료. 재로그인 후 이용 바람. 로그인 페이지로 이동.',
                })
                .redirect('/api/login');
        }

        // refreshToken 존재 & 유효 -> 새로운 accessToken 재발급
        console.log('accessToken 재발급 전, tokenObject 확인');
        console.log(tokenObject);
        const accessTokenPayloadData = tokenObject[refreshToken];
        const newAccessToken = createAccessToken(accessTokenPayloadData);
        res.cookie('accessToken', newAccessToken);
        return res.status(201).json({
            result: 'success',
            message: 'Access Token을 새롭게 발급하였습니다.',
            accessTokenPayloadData,
        });
    }

    // accessToken 있을 경우
    const accessTokenPayloadData = getAccessTokenPayload(accessToken);
    return res.status(200).json({
        result: 'success',
        message: `accessToken 인증 성공`,
        accessTokenPayloadData,
    });
};

// 이제 프론트에서 토큰 검증 후에 접근 허가해주는 로직 짜야함.
// 페이지 이동할 때 이거 미들웨어로 넣고, ajax 응답 성공하면 페이지 이동 라우터 호출.

// 사용자의 name과 login_type, dark_mode 등의 정보를 가진 accessToken과 refreshToken을 생성한 후, 쿠키에 저장합니다.
function issueTokens(accessTokenPayloadObject) {
    const accessToken = createAccessToken(accessTokenPayloadObject);
    const refreshToken = createRefreshToken();

    tokenObject[refreshToken] = accessTokenPayloadObject; // Refresh Token을 가지고 해당 유저의 정보를 서버에 저장합니다.
    return { accessToken, refreshToken };
}

// Access Token을 생성합니다.
function createAccessToken(id, loginType, themee) {
    const accessToken = jwt.sign(
        { id, loginType, theme }, // JWT 데이터
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
