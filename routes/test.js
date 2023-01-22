const express = require('express');
const router = express.Router();

const { User, Store, Review, Order } = require('../models');

// user insert
router.post('/test/user', async (req, res, next) => {
    const { nickname, password, email, phone } = req.body;
    try {
        const user = await User.create({
            nickname,
            password,
            email,
            phone,
        });
        console.log(user);
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// user find
router.get('/test/user', async (req, res, next) => {
    const { nickname, password, email, phone } = req.body;
    try {
        const users = await User.findAll();
        console.log(users);
        res.json(users);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// user update - point 수정
router.patch('/test/user/:id', async (req, res, next) => {
    const id = req.params.id;
    const { point } = req.body;
    try {
        const updatedResult = await User.update(
            {
                point,
            },
            {
                where: { id },
            }
        );
        console.log(updatedResult);
        res.json(updatedResult);
        // updatedResult === 1 이면 수정된 것
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// user delete
router.delete('/test/user/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const deletedResult = await User.destroy({
            where: { id },
        });
        console.log(deletedResult);
        res.json(deletedResult);
        // deletedResult === 1 이면 삭제된 것
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
