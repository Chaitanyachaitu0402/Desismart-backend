const { sequelize } = require('../db')
const vegetablesModel = require('../model/vegetables')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE VEGETABLES

const createVegetables = async (userData) => {
    try {
        const newUser = await vegetablesModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create vegetables details in controller", error);
        throw new Error("Error in create vegetables in controller");
    }
};

// UPDATE VEGETABLES

const updateVegetables = async (product_id, userData) => {
    try {
        const newUser = await vegetablesModel.update(userData, {
            where: {
                product_id: product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update vegetables in controller", error);
        throw new Error("Error update vegetables in controller");
    }
};

// DELETE VEGETABLES

const deleteVegetables = async (product_id) => {
    try {
        const newUser = await vegetablesModel.destroy({
            where: {
                product_id: product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete vegetables in controller", error);
        throw new Error("Error delete vegetables in controller");
    }
};

// GET VEGETABLES

const getVegetablesById = async (product_id) => {
    try {
        const user = await vegetablesModel.findOne({
            where: {
                product_id: product_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get vegetables in controller..!", error);
        throw new Error('enable to create vegetables error')
    }
};

// GET ALL VEGETABLES

const getAllVegetables = async (userData) => {
    try {

        const user = await vegetablesModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get vegetables in controller..!", error);
        throw new Error('enable to create vegetables error')
    }
}

// SEARCH VEGETABLES

const searchVegetablesDetails = async (userData) => {
    try {

        const data = {};
        if (userData.product_name) {
            data.title = userData.title
        }

        if (userData.product_id) {
            data.product_id = userData.product_id
        }
        const user = await vegetablesModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search vegetables in controller", error)
        errorResponse("error in search vegetables in controller")
    }
};

module.exports = {
    createVegetables,
    updateVegetables,
    deleteVegetables,
    getVegetablesById,
    getAllVegetables,
    searchVegetablesDetails

}