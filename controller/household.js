const { sequelize } = require('../db')
const householdModel = require('../model/household')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE HOUSEHOLD

const createHouseHold = async (userData) => {
    try {
        const newUser = await householdModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create Household details in controller", error);
        throw new Error("Error in create Household in controller");
    }
};

// UPDATE HOUSEHOLD

const updateHouseHold = async (product_id, userData) => {
    try {
        const newUser = await householdModel.update(userData, {
            where: {
                product_id: product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update Household in controller", error);
        throw new Error("Error update Household in controller");
    }
};

// DELETE HOUSEHOLD

const deleteHouseHold = async (product_id) => {
    try {
        const newUser = await householdModel.destroy({
            where: {
                product_id: product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete Household in controller", error);
        throw new Error("Error delete Household in controller");
    }
};

// GET HOUSEHOLD BY ID

const getHouseHoldById = async (product_id) => {
    try {
        const user = await householdModel.findOne({
            where: {
                product_id: product_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get Household in controller..!", error);
        throw new Error('enable to create Household error')
    }
};

// GET ALL HOUSEHOLD

const getAllHouseHold = async (userData) => {
    try {

        const user = await householdModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get Household in controller..!", error);
        throw new Error('enable to create Household error')
    }
}

// SEARCH HOUSEHOLD

const searchHouseHoldDetails = async (userData) => {
    try {

        const data = {};
        if (userData.product_name) {
            data.product_name = userData.product_name
        }

        if (userData.product_id) {
            data.product_id = userData.product_id
        }
        const user = await householdModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search Household in controller", error)
        errorResponse("error in search Household in controller")
    }
};

module.exports = {
    createHouseHold,
    updateHouseHold,
    deleteHouseHold,
    getHouseHoldById,
    getAllHouseHold,
    searchHouseHoldDetails

}