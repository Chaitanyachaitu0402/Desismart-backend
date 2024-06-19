const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const usermodel = Sequelize.define('wallet',
        {
            wallet_id: { type: DataTypes.STRING, primaryKey: true },

            wallet_name: { type: DataTypes.STRING, },

            date: { type: DataTypes.STRING, },

            time: { type: DataTypes.STRING, },

            amount: { type: DataTypes.STRING, allowNull: true },

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
            tableName: 'wallet'
        }

    );
    return usermodel;

}

