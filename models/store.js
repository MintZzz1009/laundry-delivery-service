const Sequelize = require('sequelize');

module.exports = class Store extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            // 테이블에 대한 설정
            {
                store_name: {
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
                    allowNull: false,
                    unique: true,
                },
                location: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                    unique: false,
                },
                point: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: true,
                    unique: false,
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
                modelName: 'Store',
                tableName: 'stores',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_0900_ai_ci',
            }
        );
    }
    static associate(db) {
        // 다른 모델과의 관계
        // store : order = 1 : N
        db.Store.hasMany(db.Order, {
            foreignKey: 'receiver',
            sourceKey: 'id',
        });
        // store : review = 1 : N
        db.Store.hasMany(db.Review, {
            foreignKey: 'target-store',
            sourceKey: 'id',
        });
    }
};
