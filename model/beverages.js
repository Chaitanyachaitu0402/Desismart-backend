const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const usermodel = Sequelize.define('beverages',
        {
            product_id: { type: DataTypes.STRING, primaryKey: true },

            product_name: { type: DataTypes.STRING, },

            product_image: { type: DataTypes.JSON },

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
            tableName: 'beverages'
        }

    );
    return usermodel;

}

