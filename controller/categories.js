const { sequelize } = require('../db')
const categoriestModel = require('../model/categories')(sequelize)
const sub_categoriesModel = require('../model/sub_categories')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


sub_categoriesModel.belongsTo(categoriestModel, {
    foreignKey: "categories_id", // This should match the sourceKey in hasMany
   targetKey: "categories_id", // This should match the sourceKey in hasMany
   as: "sub_categories_details", // Renamed from "projectDatails" to match the hasMany alias
 });
 
 categoriestModel.hasMany(sub_categoriesModel, {
   foreignKey: "categories_id", // This should match the sourceKey in belongsTo
   sourceKey: "categories_id", // This should match the targetKey in belongsTo
   as: "sub_categories_details", // Renamed from "projectDatails" to match the belongsTo alias
 });
 


// CREATE  CATEGORIES

const createCategories = async (userData) => {
    try {
        const newUser = await categoriestModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create categories details in controller", error);
        throw new Error("Error in create categories in controller");
    }
};

// UPDATE  CATEGORIES

const updateCategories = async (categories_id, userData) => {
    try {
        const newUser = await categoriestModel.update(userData, {
            where: {
                categories_id: categories_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update categories in controller", error);
        throw new Error("Error update categories in controller");
    }
};

// DELETE  CATEGORIES

const deleteCategories = async (categories_id) => {
    try {
        const newUser = await categoriestModel.destroy({
            where: {
                categories_id: categories_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete categories in controller", error);
        throw new Error("Error delete categories in controller");
    }
};

// GET  CATEGORIES

const getCategoriesById = async (categories_id) => {
    try {
        const user = await categoriestModel.findOne({
            where: {
                categories_id: categories_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get categories in controller..!", error);
        throw new Error('enable to create categories error')
    }
};

// GET ALL  CATEGORIES

const getAllCategories = async () => {
    try {

        const user = await categoriestModel.findAll({
            include: [{
              model: sub_categoriesModel,
              as: 'sub_categories_details',
            }],
          });
       
        return user
    }
    catch (error) {
        console.log("error in get categories in controller..!", error);
        throw new Error('enable to create categories error')
    }
}

// SEARCH  CATEGORIES

const searchCategoriesDetails = async (userData) => {
    try {

        const data = {};
        if (userData.categories_name) {
            data.categories_name = userData.categories_name
        }

        if (userData.categories_id) {
            data.categories_id = userData.categories_id
        }
        const user = await categoriestModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search categories in controller", error)
        errorResponse("error in search categories in controller")
    }
};

module.exports = {
    createCategories,
    updateCategories,
    deleteCategories,
    getCategoriesById,
    getAllCategories,
    searchCategoriesDetails
}
