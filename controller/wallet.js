const { sequelize } = require('../db')
const walletModel = require('../model/wallet')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE WALLET

const createWallet = async (userData) => {
    try {
        const newUser = await walletModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create wallet details in controller", error);
        throw new Error("Error in create wallet in controller");
    }
};

// UPDATE WALLET

const updateWallet = async (wallet_id, userData) => {
    try {
        const newUser = await walletModel.update(userData, {
            where: {
                wallet_id: wallet_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update wallet in controller", error);
        throw new Error("Error update wallet in controller");
    }
};

// DELETE WALLET

const deleteWallet = async (wallet_id) => {
    try {
        const newUser = await walletModel.destroy({
            where: {
                wallet_id: wallet_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete wallet in controller", error);
        throw new Error("Error delete wallet in controller");
    }
};

// GET WALLET

const getWalletById = async (wallet_id) => {
    try {
        const user = await walletModel.findOne({
            where: {
                wallet_id: wallet_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get wallet in controller..!", error);
        throw new Error('enable to create wallet error')
    }
};

// GET ALL WALLET

const getAllWallet = async (userData) => {
    try {

        const user = await walletModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get wallet in controller..!", error);
        throw new Error('enable to create wallet error')
    }
}

// SEARCH WALLET

const searchWalletDetails = async (userData) => {
    try {

        const data = {};
        if (userData.wallet_name) {
            data.wallet_name = userData.wallet_name
        }

        if (userData.wallet_id) {
            data.wallet_id = userData.wallet_id
        }
        const user = await walletModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search wallet in controller", error)
        errorResponse("error in search wallet in controller")
    }
};

module.exports = {
    createWallet,
    updateWallet,
    deleteWallet,
    getWalletById,
    getAllWallet,
    searchWalletDetails

}