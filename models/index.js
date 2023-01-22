const Sequelize = require('sequelize');
// Sequelize는 시퀄라이즈 패키지이자 생성자
const User = require('./user');
const Store = require('./store');
const Review = require('./review');
const Order = require('./order');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env]; // env === development일 경우, config에 config.development 객체 할당
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

// db 객체에 각 모델들 담기 + db 객체 임포트(require)하여 각 모델에 접근 가능
db.User = User;
db.Store = Store;
db.Review = Review;
db.Order = Order;

// 각 모델의 static.init 메서드 호출 -> init 실행으로 테이블이 모델로 연결됨.
User.init(sequelize);
Store.init(sequelize);
Review.init(sequelize);
Order.init(sequelize);

// 다른 테이블과의 관계를 연결하는 associate 메서드
User.associate(db);
Store.associate(db);
Review.associate(db);
Order.associate(db);

module.exports = db;
