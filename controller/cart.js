const { sequelize } = require('../db')
const cartModel = require('../model/cart')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE CART

const createCart = async (userData) => {
    try {
        const newUser = await cartModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create cart details in controller", error);
        throw new Error("Error in create cart in controller");
    }
};

// UPDATE CART

const updateCart = async (cart_id, userData) => {
    try {
        const newUser = await cartModel.update(userData, {
            where: {
                cart_id: cart_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update cart in controller", error);
        throw new Error("Error update cart in controller");
    }
};

// DELETE CART

const deleteCart = async (cart_id) => {
    try {
        const newUser = await cartModel.destroy({
            where: {
                cart_id: cart_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete cart in controller", error);
        throw new Error("Error delete cart in controller");
    }
};

// GET CART

const getCartById = async (cart_id) => {
    try {
        const user = await cartModel.findOne({
            where: {
                cart_id: cart_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get cart in controller..!", error);
        throw new Error('enable to create cart error')
    }
};

// GET ALL CART

const getAllCart = async (userData) => {
    try {

        const user = await cartModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get cart in controller..!", error);
        throw new Error('enable to create cart error')
    }
}

// SEARCH CART

const searchCartDetails = async (userData) => {
    try {

        const data = {};
        if (userData.cart_name) {
            data.cart_name = userData.cart_name
        }

        if (userData.cart_id) {
            data.cart_id = userData.cart_id
        }
        const user = await cartModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search cart in controller", error)
        errorResponse("error in search cart in controller")
    }
};

module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getCartById,
    getAllCart,
    searchCartDetails
}