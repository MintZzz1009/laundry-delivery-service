// config
const dotenv = require('dotenv');

// express
const express = require('express');

const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const { sequelize } = require('./models'); // index.js 생략

// Template
const ejs = require('ejs');

// multer
const multer = require('multer');
const form_data = multer();

// body-parser
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// reviewImages Dir 생성
try {
    fs.readdirSync('reviewImages');
} catch (error) {
    console.error('not exist directory.');
    fs.mkdirSync('reviewImages');
}

const router = require('./routes');
const expressRender = require('./render');
const error = require('./error');

// env setting
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json({ limit: 5000000 })); // limit: 5MB
app.use(
    express.urlencoded({
        limit: 5000000,
        extended: false,
        parameterLimit: 50000,
    })
);

app.set('port', process.env.PORT || 3001);
// ejs setting
app.set('view engine', 'ejs');
app.set('views', './views');

//sequelize
// 서버 실행시 MySQL과 연동되도록 | force: true 일 경우 서버 실행시마다 테이블 재생성  => 테이블 잘못 만들었을 경우, true로 바꿔서 실행하면 된다.
sequelize
    .sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

// 미들웨어
app.use(morgan('dev'));
app.use(express.static('static'));
// app.use(express.static(path.join(__dirname, 'static')));
// app.use(express.json({}));
// app.use(express.urlencoded({ extended: false }));

app.use('/api', router);
app.use('/', expressRender);
app.use(error);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
