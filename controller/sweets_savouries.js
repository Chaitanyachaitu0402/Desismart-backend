const { sequelize } = require('../db')
const sweets_savouries_Model = require('../model/sweets_savouries')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE SWEETS AND SAVOURIES

const createSweetsSavouries = async (userData) => {
    try {
        const newUser = await sweets_savouries_Model.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create sweets-savouries details in controller", error);
        throw new Error("Error in create sweets-savouries in controller");
    }
};

// UPDATE SWEETS AND SAVOURIES

const updateSweetsSavouries = async (product_id, userData) => {
    try {
        const newUser = await sweets_savouries_Model.update(userData, {
            where: {
                product_id: product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update sweets-savouries in controller", error);
        throw new Error("Error update sweets-savouries in controller");
    }
};

// DELETE SWEETS AND SAVOURIES

const deleteSweetsSavouries = async (product_id) => {
    try {
        const newUser = await sweets_savouries_Model.destroy({
            where: {
                product_id: product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete sweets-savouries in controller", error);
        throw new Error("Error delete sweets-savouries in controller");
    }
};

// GET SWEETS AND SAVOURIES

const getSweetsSavouriesById = async (product_id) => {
    try {
        const user = await sweets_savouries_Model.findOne({
            where: {
                product_id: product_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get sweets-savouries in controller..!", error);
        throw new Error('enable to create sweets-savouries error')
    }
};

// GET ALL SWEETS AND SAVOURIES

const getAllSweetsSavouries = async (userData) => {
    try {

        const user = await sweets_savouries_Model.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get sweets-savouries in controller..!", error);
        throw new Error('enable to create sweets-savouries error')
    }
}

// SEARCH SWEETS AND SAVOURIES

const searchSweetsSavouriesDetails = async (userData) => {
    try {

        const data = {};
        if (userData.product_name) {
            data.product_name = userData.product_name
        }

        if (userData.product_id) {
            data.product_id = userData.product_id
        }
        const user = await sweets_savouries_Model.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search sweets-savouries in controller", error)
        errorResponse("error in search sweets-savouries in controller")
    }
};

module.exports = {
    createSweetsSavouries,
    updateSweetsSavouries,
    deleteSweetsSavouries,
    getSweetsSavouriesById,
    getAllSweetsSavouries,
    searchSweetsSavouriesDetails

}