const { sequelize } = require('../db')
const poojaModel = require('../model/pooja')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE POOJA

const createPooja = async (userData) => {
    try {
        const newUser = await poojaModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create pooja details in controller", error);
        throw new Error("Error in create pooja in controller");
    }
};

// UPDATE POOJA

const updatePooja = async (product_id, userData) => {
    try {
        const newUser = await poojaModel.update(userData, {
            where: {
                product_id: product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update pooja in controller", error);
        throw new Error("Error update pooja in controller");
    }
};

// DELETE POOJA

const deletePooja = async (product_id) => {
    try {
        const newUser = await poojaModel.destroy({
            where: {
                product_id: product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete pooja in controller", error);
        throw new Error("Error delete pooja in controller");
    }
};

// GET POOJA

const getPoojaById = async (product_id) => {
    try {
        const user = await poojaModel.findOne({
            where: {
                product_id: product_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get pooja in controller..!", error);
        throw new Error('enable to create pooja error')
    }
};

// GET ALL POOJA

const getAllPooja = async (userData) => {
    try {

        const user = await poojaModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get pooja in controller..!", error);
        throw new Error('enable to create pooja error')
    }
}

// SEARCH POOJA

const searchPoojaDetails = async (userData) => {
    try {

        const data = {};
        if (userData.product_name) {
            data.product_name = userData.product_name
        }

        if (userData.product_id) {
            data.product_id = userData.product_id
        }
        const user = await poojaModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search pooja in controller", error)
        errorResponse("error in search pooja in controller")
    }
};

module.exports = {
    createPooja,
    updatePooja,
    deletePooja,
    getPoojaById,
    getAllPooja,
    searchPoojaDetails

}