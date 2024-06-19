const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const usermodel = Sequelize.define('contact',
        {
            id: { type: DataTypes.STRING, primaryKey: true },

            name: { type: DataTypes.STRING, },

            email: { type: DataTypes.STRING, },

            phone_number: { type: DataTypes.STRING, },

            message: { type: DataTypes.STRING, allowNull: true },

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
            tableName: 'contact'
        }

    );
    return usermodel;

}

