const Sequelize = require('sequelize');

module.exports = class Users extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            // 테이블에 대한 설정
            {
                nickname: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                    unique: true,
                },
                phone: {
                    type: Sequelize.STRING(255),
                    allowNull: true,
                    unique: true,
                },
                point: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: true,
                    unique: false,
                    defaultValue: 1000000,
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                sequelize,
                timestamps: true,
                userscored: false,
                modelName: 'User',
                tableName: 'users',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_0900_ai_ci',
            }
        );
    }
    static associate(db) {
        // 다른 모델과의 관계
        // user : order = 1 : N
        db.User.hasMany(db.Order, {
            foreignKey: 'orderer', // n
            sourceKey: 'id', // 1
        });
        // users : reviews = 1 : N
        db.User.hasMany(db.Review, {
            foreignKey: 'reviewer',
            sourceKey: 'id',
        });
    }
};
