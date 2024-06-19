const { sequelize } = require('../db')
const orderModel = require('../model/orders')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE ORDERS

const createOrder = async (userData) => {
    try {
        const newUser = await orderModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create order details in controller", error);
        throw new Error("Error in create order in controller");
    }
};

// UPDATE ORDERS

const updateOrder = async (order_id, userData) => {
    try {
        const newUser = await orderModel.update(userData, {
            where: {
                order_id: order_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update order in controller", error);
        throw new Error("Error update order in controller");
    }
};

// DELETE ORDERS

const deleteOrder = async (order_id) => {
    try {
        const newUser = await orderModel.destroy({
            where: {
                order_id: order_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete order in controller", error);
        throw new Error("Error delete order in controller");
    }
};

// GET ORDERS

const getOrderById = async (order_id) => {
    try {
        const user = await orderModel.findOne({
            where: {
                order_id: order_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get order in controller..!", error);
        throw new Error('enable to create order error')
    }
};

// GET ALL ORDERS

const getAllOrder = async (userData) => {
    try {

        const user = await orderModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get order in controller..!", error);
        throw new Error('enable to create order error')
    }
}

// SEARCH ORDERS

const searchOrderDetails = async (userData) => {
    try {

        const data = {};
        if (userData.order_name) {
            data.order_name = userData.order_name
        }

        if (userData.order_id) {
            data.order_id = userData.order_id
        }
        const user = await orderModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search order in controller", error)
        errorResponse("error in search order in controller")
    }
};

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderById,
    getAllOrder,
    searchOrderDetails
}