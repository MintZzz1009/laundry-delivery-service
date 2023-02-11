const Sequelize = require('sequelize');

module.exports = class Order extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            // 테이블에 대한 설정
            {
                status: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    unique: false,
                    defaultValue: 0,
                },
                location: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                image_path: {
                    type: Sequelize.STRING(255),
                    allowNull: true,
                },
                user_req: {
                    type: Sequelize.STRING(255),
                    allowNull: true,
                },
                // createdAt: {
                //     type: Sequelize.DATE,
                //     allowNull: false,
                //     defaultValue: Sequelize.NOW,
                // },
                // updatedAt: {
                //     type: Sequelize.DATE,
                //     allowNull: false,
                //     defaultValue: Sequelize.NOW,
                // },
            },
            {
                sequelize,
                timestamps: true,
                userscored: false,
                modelName: 'Order',
                tableName: 'orders',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_0900_ai_ci',
            }
        );
    }
    static associate(db) {
        // 다른 모델과의 관계
        // order : user = N : 1
        db.Order.belongsTo(db.User, {
            foreignKey: 'orderer', // n
            targetKey: 'id', // 1
        });
        // order : store = N : 1
        db.Order.belongsTo(db.Store, {
            foreignKey: 'receiver',
            targetKey: 'id',
        });
        // order : review = 1 : 1
        db.Order.belongsTo(db.Review, {
            foreignKey: 'review',
            targetKey: 'id',
        });
    }
};
