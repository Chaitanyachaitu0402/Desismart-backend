const { sequelize } = require('../db')
const beveragesModel = require('../model/beverages')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE BEVERAGES

const createBeverages = async (userData) => {
    try {
        const newUser = await beveragesModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create beverages details in controller", error);
        throw new Error("Error in create beverages in controller");
    }
};

// UPDATE BEVERAGES

const updateBeverages = async (product_id, userData) => {
    try {
        const newUser = await beveragesModel.update(userData, {
            where: {
                product_id: product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update beverages in controller", error);
        throw new Error("Error update beverages in controller");
    }
};

// DELETE BEVERAGES

const deleteBeverages = async (product_id) => {
    try {
        const newUser = await beveragesModel.destroy({
            where: {
                product_id: product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete beverages in controller", error);
        throw new Error("Error delete beverages in controller");
    }
};

// GET BEVERAGES

const getBeveragesById = async (product_id) => {
    try {
        const user = await beveragesModel.findOne({
            where: {
                product_id: product_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get beverages in controller..!", error);
        throw new Error('enable to create beverages error')
    }
};

// GET ALL BEVERAGES

const getAllBeverages = async (userData) => {
    try {

        const user = await beveragesModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get beverages in controller..!", error);
        throw new Error('enable to create beverages error')
    }
}

// SEARCH BEVERAGES

const searchBeveragesDetails = async (userData) => {
    try {

        const data = {};
        if (userData.product_name) {
            data.product_name = userData.product_name
        }

        if (userData.id) {
            data.product_id = userData.product_id
        }
        const user = await beveragesModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search beverages in controller", error)
        errorResponse("error in search beverages in controller")
    }
};

module.exports = {
    createBeverages,
    updateBeverages,
    deleteBeverages,
    getBeveragesById,
    getAllBeverages,
    searchBeveragesDetails
}