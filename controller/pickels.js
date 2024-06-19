const { sequelize } = require('../db')
const pickelsModel = require('../model/pickels')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE PICKELS

const createPickels = async (userData) => {
    try {
        const newUser = await pickelsModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create pickels details in controller", error);
        throw new Error("Error in create pickels in controller");
    }
};

// UPDATE PICKELS

const updatePickels = async (product_id, userData) => {
    try {
        const newUser = await pickelsModel.update(userData, {
            where: {
                product_id: product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update pickels in controller", error);
        throw new Error("Error update pickels in controller");
    }
};

// DELETE PICKELS

const deletePickels = async (product_id) => {
    try {
        const newUser = await pickelsModel.destroy({
            where: {
                product_id: product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete pickels in controller", error);
        throw new Error("Error delete pickels in controller");
    }
};

// GET PICKELS

const getPickelsById = async (product_id) => {
    try {
        const user = await pickelsModel.findOne({
            where: {
                product_id: product_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get pickels in controller..!", error);
        throw new Error('enable to create pickels error')
    }
};

// GET ALL PICKELS

const getAllPickels = async (userData) => {
    try {

        const user = await pickelsModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get pickels in controller..!", error);
        throw new Error('enable to create pickels error')
    }
}

// SEARCH PICKELS

const searchPickelsDetails = async (userData) => {
    try {

        const data = {};
        if (userData.product_name) {
            data.product_name = userData.product_name
        }

        if (userData.product_id) {
            data.product_id = userData.product_id
        }
        const user = await pickelsModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search pickels in controller", error)
        errorResponse("error in search pickels in controller")
    }
};

module.exports = {
    createPickels,
    updatePickels,
    deletePickels,
    getPickelsById,
    getAllPickels,
    searchPickelsDetails

}