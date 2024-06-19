const { sequelize } = require('../db')
const groceriesModel = require('../model/groceries')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE GROCERIES

const createGroceries = async (userData) => {
    try {
        const newUser = await groceriesModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create Groceries details in controller", error);
        throw new Error("Error in create Groceries in controller");
    }
};

// UPDATE GROCERIES

const updateGroceries = async (product_id, userData) => {
    try {
        const newUser = await groceriesModel.update(userData, {
            where: {
                product_id: product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update Groceries in controller", error);
        throw new Error("Error update Groceries in controller");
    }
};

// DELETE GROCERIES

const deleteGroceries = async (product_id) => {
    try {
        const newUser = await groceriesModel.destroy({
            where: {
                product_id:product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete Groceries in controller", error);
        throw new Error("Error delete Groceries in controller");
    }
};

// GET GROCERIES

const getGroceriesById = async (product_id) => {
    try {
        const user = await groceriesModel.findOne({
            where: {
                product_id:product_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get Groceries in controller..!", error);
        throw new Error('enable to create Groceries error')
    }
};

// GET ALL GROCERIES

const getAllGroceries = async (userData) => {
    try {

        const user = await groceriesModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get Groceries in controller..!", error);
        throw new Error('enable to create Groceries error')
    }
}

// SEARCH GROCERIES

const searchGroceriesDetails = async (userData) => {
    try {

        const data = {};
        if (userData.product_name) {
            data.product_name = userData.product_name
        }

        if (userData.product_id) {
            data.product_id = userData.product_id
        }
        const user = await groceriesModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search Groceries in controller", error)
        errorResponse("error in search Groceries in controller")
    }
};

module.exports = {
    createGroceries,
    updateGroceries,
    deleteGroceries,
    getGroceriesById,
    getAllGroceries,
    searchGroceriesDetails
    
}