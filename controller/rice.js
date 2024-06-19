const { sequelize } = require('../db')
const riceModel = require('../model/rice')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE RICE

const createRice = async (userData) => {
    try {
        const newUser = await riceModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create Rice details in controller", error);
        throw new Error("Error in create Rice in controller");
    }
};

// UPDATE RICE

const updateRice = async (product_id, userData) => {
    try {
        const newUser = await riceModel.update(userData, {
            where: {
                product_id: product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update Rice in controller", error);
        throw new Error("Error update Rice in controller");
    }
};

// DELETE RICE

const deleteRice = async (product_id) => {
    try {
        const newUser = await riceModel.destroy({
            where: {
                product_id: product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete Rice in controller", error);
        throw new Error("Error delete Rice in controller");
    }
};

// GET RICE

const getRiceById = async (product_id) => {
    try {
        const user = await riceModel.findOne({
            where: {
                product_id: product_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get Rice in controller..!", error);
        throw new Error('enable to create Rice error')
    }
};

// GET ALL RICE

const getAllRice = async (userData) => {
    try {

        const user = await riceModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get Rice in controller..!", error);
        throw new Error('enable to create Rice error')
    }
}

// SEARCH RICE

const searchRiceDetails = async (userData) => {
    try {

        const data = {};
        if (userData.product_name) {
            data.product_name = userData.product_name
        }

        if (userData.product_id) {
            data.product_id = userData.product_id
        }
        const user = await riceModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search Rice in controller", error)
        errorResponse("error in search Rice in controller")
    }
};

module.exports = {
    createRice,
    updateRice,
    deleteRice,
    getRiceById,
    getAllRice,
    searchRiceDetails

}