const { sequelize } = require('../db')
const fruitsModel = require('../model/fruits')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE FRUITS

const createFruits = async (userData) => {
    try {
        const newUser = await fruitsModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create fruits details in controller", error);
        throw new Error("Error in create fruits in controller");
    }
};

// UPDATE FRUITS

const updateFruits = async (product_id, userData) => {
    try {
        const newUser = await fruitsModel.update(userData, {
            where: {
                product_id: product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update fruits in controller", error);
        throw new Error("Error update fruits in controller");
    }
};

// DELETE FRUITS

const deleteFruits = async (product_id) => {
    try {
        const newUser = await fruitsModel.destroy({
            where: {
                product_id:product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete fruits in controller", error);
        throw new Error("Error delete fruits in controller");
    }
};

// GET FRUITS

const getFruitsById = async (product_id) => {
    try {
        const user = await fruitsModel.findOne({
            where: {
                product_id: product_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get fruits in controller..!", error);
        throw new Error('enable to create fruits error')
    }
};

// GET ALL FRUITS

const getAllFruits = async (userData) => {
    try {

        const user = await fruitsModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get fruits in controller..!", error);
        throw new Error('enable to create fruits error')
    }
}

// SEARCH FRUITS

const searchFruitsDetails = async (userData) => {
    try {

        const data = {};
        if (userData.product_name) {
            data.product_name = userData.product_name
        }

        if (userData.product_id) {
            data.product_id = userData.product_id
        }
        const user = await fruitsModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search fruits in controller", error)
        errorResponse("error in search fruits in controller")
    }
};

module.exports = {
    createFruits,
    updateFruits,
    deleteFruits,
    getFruitsById,
    getAllFruits,
    searchFruitsDetails

}