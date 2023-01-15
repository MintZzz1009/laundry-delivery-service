// config
const dotenv = require('dotenv');

// express
const express = require('express');

const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const { sequelize } = require('./models');  // index.js 생략

// Template
const ejs = require('ejs');

// multer
const multer = require('multer');
const form_data = multer();

// body-parser
const bodyParser = require('body-parser');

// Router
const reviewPostRouter = require('./routes/routes.review.post');
const reviewsRouter = require('./routes/routes.reviews');
const signUpRouter = require('./routes/routes.signup');
const logInRouter = require('./routes/routes.login');

// env setting
dotenv.config();

const app = express();
app.set('port' = process.env.PORT || 3001)
// ejs setting
app.set('view engine', 'ejs');
app.set('views', './views');

//sequelize
sequelize
    .sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });
l;

// 미들웨어
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'views')));
//app.use(express.static('./views'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 라우터
app.use('/api', [reviewPostRouter, reviewsRouter, signUpRouter, logInRouter]);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.get('/', (req, res) => {
    console.log('app.js 실행 =>ㄴ app.get("/")');
    // jwt 토큰 검사 -> login 값 변경
    res.render('main', {
        login: true,
        title: '코딩할 팔자',
        mode: 'light',
    });
    // res.status(200).send('review test를 위한 임시 서버');
});


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
})
