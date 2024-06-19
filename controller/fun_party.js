const { sequelize } = require('../db')
const funpartyModel = require('../model/fun_party')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE FUN PARTY

const createFunParty = async (userData) => {
    try {
        const newUser = await funpartyModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create fun and party details in controller", error);
        throw new Error("Error in create fun and party in controller");
    }
};

// UPDATE FUN PARTY

const updateFunParty = async (product_id, userData) => {
    try {
        const newUser = await funpartyModel.update(userData, {
            where: {
                product_id: product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update fun and party in controller", error);
        throw new Error("Error update fun and party in controller");
    }
};

// DELETE FUN PARTY

const deleteFunParty = async (product_id) => {
    try {
        const newUser = await funpartyModel.destroy({
            where: {
                product_id: product_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete fun and party in controller", error);
        throw new Error("Error delete fun and party in controller");
    }
};

// GET FUN PARTY BY ID

const getFunPartyById = async (product_id) => {
    try {
        const user = await funpartyModel.findOne({
            where: {
                product_id: product_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get fun and party in controller..!", error);
        throw new Error('enable to create fun and party error')
    }
};

// GET ALL FUN PARTY

const getAllFunParty = async (userData) => {
    try {

        const user = await funpartyModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get fun and party in controller..!", error);
        throw new Error('enable to create fun and party error')
    }
}

// SEARCH FUN PARTY

const searchFunPartyDetails = async (userData) => {
    try {

        const data = {};
        if (userData.product_name) {
            data.product_name = userData.product_name
        }

        if (userData.product_id) {
            data.product_id = userData.product_id
        }
        const user = await funpartyModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search fun and party in controller", error)
        errorResponse("error in search fun and party in controller")
    }
};

module.exports = {
    createFunParty,
    updateFunParty,
    deleteFunParty,
    getFunPartyById,
    getAllFunParty,
    searchFunPartyDetails

}