const { DataTypes,Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const usermodel = Sequelize.define('order', 
    {
        order_id: { type: DataTypes.STRING, primaryKey:true  },
       
        user_id:{type:DataTypes.STRING,},

        user_name:{type:DataTypes.STRING,},

        order_details:{type:DataTypes.STRING,},
       
        total_cost:{type:DataTypes.STRING,},
       
        mode_of_payment: { type: DataTypes.STRING, },
       
        delivery_date:{ type:DataTypes.STRING, allowNull:true},

        time: {type: DataTypes.STRING, },

        status: {
            type: DataTypes.STRING,
            defaultValue:"Pending",
            validate: {
                isIn: [["Declined","Approved","Pending"]]
            },
        },
        
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
            tableName: 'order'
        }

    );
    return usermodel;

}

