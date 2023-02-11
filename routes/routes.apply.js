const express = require('express');
const { User, Order } = require('../models');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const upload = multer({
    storage: multer.diskStorage({
        // 파일 저장 경로: ./applyImages
        destination: function (req, file, cb) {
            cb(null, 'applyImages/');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + path.extname(file.originalname));
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.get('/apply', async (req, res, next) => {
    const nickname = req.cookies.nickname;
    console.log(nickname);
    try {
        const user = await User.findOne({
            where: { nickname: nickname },
        });
        console.log('@@@@@@@@@@@@@@@', user.nickname);
        res.render('apply', {
            title: '세탁 신청하기',
            unickname: user.nickname,
            uphone: user.phone,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

try {
    fs.readdirSync('applyImage');
} catch (error) {
    console.error('applyImage 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('applyImage');
}

router.post('/apply', upload.single('applyImage'), async (req, res, next) => {
    // const applyImage = req.file; // 안해도 파일 저장된다.
    const { applyAddress, applylaundryInfo, applyReq } = req.body;
    const nickname = req.cookies.nickname;
    const user = await User.findOne({
        where: { nickname: nickname },
    });
    console.log('user.nickname', user.nickname);
    console.log('user.id', user.id);
    console.log('user', user);
    const order = Order.create({
        location: applyAddress,
        image_path: req.file.path,
        user_req: applyReq,
        orderer: user.id,
    });
    res.json({ msg: 'success', data: order });
});

module.exports = router;
