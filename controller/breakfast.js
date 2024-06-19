const { sequelize } = require('../db')
const breakfastModel = require('../model/breakfast')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE BREAKFAST

const createBreakFast = async (userData) => {
    try {
        const newUser = await breakfastModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create breakfast details in controller", error);
        throw new Error("Error in create breakfast in controller");
    }
};

// UPDATE BREAKFAST

const updateBreakFast = async (product_id, userData) => {
    try {
        const newUser = await breakfastModel.update(userData, {
            where: {
                product_id: product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update breakfast in controller", error);
        throw new Error("Error update breakfast in controller");
    }
};

// DELETE BREAKFAST

const deleteBreakFast = async (product_id) => {
    try {
        const newUser = await breakfastModel.destroy({
            where: {
                product_id: product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete breakfast in controller", error);
        throw new Error("Error delete breakfast in controller");
    }
};

// GET BREAKFAST

const getBreakFastById = async (product_id) => {
    try {
        const user = await breakfastModel.findOne({
            where: {
                product_id: product_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get breakfast in controller..!", error);
        throw new Error('enable to create breakfast error')
    }
};

// GET ALL BREAKFAST

const getAllBreakFast = async (userData) => {
    try {

        const user = await breakfastModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get breakfast in controller..!", error);
        throw new Error('enable to create breakfast error')
    }
}

// SEARCH BREAKFAST

const searchBreakFastDetails = async (userData) => {
    try {

        const data = {};
        if (userData.product_name) {
            data.product_name = userData.product_name
        }

        if (userData.product_id) {
            data.product_id = userData.product_id
        }
        const user = await breakfastModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search breakfast in controller", error)
        errorResponse("error in search breakfast in controller")
    }
};

module.exports = {
    createBreakFast,
    updateBreakFast,
    deleteBreakFast,
    getBreakFastById,
    getAllBreakFast,
    searchBreakFastDetails

}