const Sequilize = require('sequelize');
// Sequelize는 시퀄라이즈 패키지이자 생성자

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

// MySQL 연결 객체 생성
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);
// 재사용을 위해서 변수에 할당.
db.sequelize = sequelize;
