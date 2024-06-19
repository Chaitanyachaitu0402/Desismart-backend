const { DataTypes,Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const usermodel = Sequelize.define('cart', 
    {
        cart_id: { type: DataTypes.STRING, primaryKey:true  },
       
        cart_name: {type: DataTypes.STRING,},

        cart_image: {type:DataTypes.JSON},
       
        cost:{type:DataTypes.STRING,},
       
        quantity: { type: DataTypes.STRING, },
       
        weight:{ type:DataTypes.STRING, allowNull:true},

        description: {type: DataTypes.STRING, },

        discount: {type: DataTypes.STRING, },

        subtotal: {type: DataTypes.STRING, },

        delivery: {type: DataTypes.STRING, },

        total_price: {type: DataTypes.STRING, },

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
            tableName: 'cart'
        }

    );
    return usermodel;

}

