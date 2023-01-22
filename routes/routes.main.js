const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    const { type, mode } = req.body;
    console.log(type);
    if (type === true) {
        res.status(200).json({ msg: 'isService === true' });
        res.render('main', {
            type: 'store',
            login: true,
            title: '코딩할 팔자',
            mode: 'light',
        });
        return;
    }
    res.status(200).json({ msg: 'isService === false' });
    res.render('main', {
        type: 'user',
        login: true,
        title: '코딩할 팔자',
        mode: 'light',
    });
});

module.exports = router;
