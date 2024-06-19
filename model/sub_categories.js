const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const usermodel = Sequelize.define('sub_categories',
        {

            sub_categories_id: { type: DataTypes.STRING, primaryKey: true },

            categories_id: { type: DataTypes.STRING, },

            sub_categories_name: { type: DataTypes.STRING, },

            sub_categories_image: { type: DataTypes.JSON },

            cost: { type: DataTypes.STRING, },

            quantity: { type: DataTypes.STRING, },

            weight: { type: DataTypes.STRING, allowNull: true },

            description: { type: DataTypes.STRING, },

            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                onUpdate: DataTypes.NOW,
            },
        },
        {
            timestamps: true,
            tableName: 'sub_categories'
        }

    );
    return usermodel;

}

