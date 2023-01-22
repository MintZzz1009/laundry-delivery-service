const express = require('express');
const router = express.Router();

const { User, Store } = require('../models');

router.post('/user', async (req, res, next) => {
    const { userNickname, inputPassword, userEmail, userPhone } = req.body;
    try {
        const user = await User.create({
            nickname: userNickname,
            password: inputPassword,
            email: userEmail,
            phone: userPhone,
        });
        res.status(201).json({ msg: '손님으로 가입성공!' });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/store', async (req, res, next) => {
    const { storeName, inputPassword, storeEmail, storePhone, storeAddress } =
        req.body;
    try {
        const store = await Store.create({
            store_name: storeName,
            password: inputPassword,
            email: storeEmail,
            phone: storePhone,
            location: storeAddress,
        });
        res.status(201).json({ msg: '사장님으로 가입성공!' });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
