const { user, reviews, laundry, store } = require('../models');
const { Op } = require('sequelize');

const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const upload = multer({
    storage: multer.diskStorage({
        // 파일 저장 경로: ./reviewImages
        destination: function (req, file, cb) {
            cb(null, 'reviewImages/');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + path.extname(file.originalname));
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

// 게시글 생성 및 DB 등록 API -> URL: /UserId/review 로 수정필요
router.post(
    '/userId/laundryId/review', // '/:userId/:laundryId/review'
    upload.single('reviewLaundryImage'),
    async (req, res, next) => {
        const reviewUserId = req.params.userId;
        const reviewLaundryId = req.params.laundryId;
        const { rating, reviewStar, reviewLaundryCategory, reviewContent } =
            req.body; // text upload
        const reviewLaundryImage = req.file; // image upload
        const reviewLaundryImagePath = req.file.path;
        console.log(reviewLaundryImagePath);
        console.log(rating, reviewStar, reviewLaundryCategory, reviewContent);
        console.log('reviewLaundryImage :', reviewLaundryImage);

        await reviews.create({
            star: reviewStar,
            category: reviewLaundryCategory,
            content: reviewContent,
            imgPath: reviewLaundryImagePath,
            user_id: reviewUserId,
            laundry_id: reviewLaundryId,
        });

        res.status(201).json({ msg: 'success!' });
    }
);

module.exports = router;
