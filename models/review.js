const Sequelize = require('sequelize');

module.exports = class Review extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            // 테이블에 대한 설정
            {
                rating: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    unique: true,
                },
                comment: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                image_path: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                    unique: true,
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
                modelName: 'Review',
                tableName: 'reviews',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_0900_ai_ci',
            }
        );
    }
    static associate(db) {
        // 다른 모델과의 관계
        // review : user = N : 1
        db.Review.belongsTo(db.User, {
            foreignKey: 'reviewer',
            targetKey: 'id',
        });
        // review : store = N : 1
        db.Review.belongsTo(db.Store, {
            foreignKey: 'target_store',
            targetKey: 'id',
        });
        // review : order = 1 : 1
        db.Review.hasOne(db.Order, {
            foreignKey: 'review',
            sourceKey: 'id',
        });
    }
};
