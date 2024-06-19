const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const usermodel = Sequelize.define('user',
        {
            user_id:
            {
                type: DataTypes.STRING,
                primaryKey: true
            },

            user_name: {
                type: DataTypes.STRING,

            },
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            mobile_number:
            {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING,
            },
            confirm_password:
            {
                type: DataTypes.STRING,
            },


            role: {
                type: DataTypes.STRING,
            },

            Address:
            {
                type: DataTypes.STRING,

            },

            profilepic:
            {
                type: DataTypes.JSON
            },
            emergencycontact:
            {
                type: DataTypes.STRING,
                allowNull: true
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: "Pending",
                validate: {
                    isIn: [["Declined", "Approved", "Pending"]]
                },
            }
            ,
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
            tableName: 'user'
        }

    );
    return usermodel;

}

