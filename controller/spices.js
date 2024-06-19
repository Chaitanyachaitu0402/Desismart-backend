const { sequelize } = require('../db')
const spicesModel = require('../model/spices')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE SPICES

const createSpices = async (userData) => {
    try {
        const newUser = await spicesModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create spices details in controller", error);
        throw new Error("Error in create spices in controller");
    }
};

// UPDATE SPICES

const updateSpices = async (product_id, userData) => {
    try {
        const newUser = await spicesModel.update(userData, {
            where: {
                product_id: product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update spices in controller", error);
        throw new Error("Error update spices in controller");
    }
};

// DELETE SPICES

const deleteSpices = async (product_id) => {
    try {
        const newUser = await spicesModel.destroy({
            where: {
                product_id: product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete spices in controller", error);
        throw new Error("Error delete spices in controller");
    }
};

// GET SPICES

const getSpicesById = async (product_id) => {
    try {
        const user = await spicesModel.findOne({
            where: {
                product_id: product_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get spices in controller..!", error);
        throw new Error('enable to create spices error')
    }
};

// GET ALL SPICES

const getAllSpices = async (userData) => {
    try {

        const user = await spicesModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get spices in controller..!", error);
        throw new Error('enable to create spices error')
    }
}

// SEARCH SPICES

const searchSpicesDetails = async (userData) => {
    try {

        const data = {};
        if (userData.product_name) {
            data.product_name = userData.product_name
        }

        if (userData.product_id) {
            data.product_id = userData.product_id
        }
        const user = await spicesModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search spices in controller", error)
        errorResponse("error in search spices in controller")
    }
};

module.exports = {
    createSpices,
    updateSpices,
    deleteSpices,
    getSpicesById,
    getAllSpices,
    searchSpicesDetails

}