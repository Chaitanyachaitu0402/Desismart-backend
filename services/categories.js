const categories_controller = require("../controller/categories");
const { v4: uuidv4 } = require('uuid');
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")



// CREATE CATEGORIES

const createCategories = async (userData) => {
    try {

        const userId = uuidv4();
        userData.body.categories_id = userId;

        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin"){

            if (userData.file) {
                userData.body.categories_image = userData.file.filename
            }

        const response = await categories_controller.createCategories(userData.body);
        return successResponse(response);
    }}
    catch (error) {
        console.log("Error in create categories in services..", error)
        return errorResponse("Error in create categories in services..")
    }
}

// UPDATE  CATEGORIES

const updateCategories = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }

        if (decodedData.role == "admin") {

            if (userData.file) {
                const getUserDate = await categories_controller.getCategoriesById(userData.body.categories_id)

                if (getUserDate.categories_image !== null) {
                    await deleteImage(getUserDate.categories_image)
                    userData.body.categories_image = userData.file.filename
                }
                else {
                    userData.body.categories_image = userData.file.filename
                }
            }
            const updatedData = await categories_controller.updateCategories(userData.body.categories_id, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update categories in servicess.....!", error)
        return errorResponse("Error in update categories in servicess")
    }
};


// DELETE  CATEGORIES

const deleteCategories= async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }

        if (decodedData.role == "admin" ) {
            const deletedData = await categories_controller.deleteCategories(userData.body.categories_id, userData.body)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete categories in  servicess.....!", error)
        return errorResponse("Error in delete categories in servicess")
    }
};


// GET  CATEGORIES BY ID

const getCategoriesById = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData) {
            const response = await categories_controller.getCategoriesById(userData.body.categories_id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id categories in  servicess.....!", error)
        return errorResponse("Error in get by id categories in servicess")
    }
};

// GET ALL  CATEGORIES

const getAllCategories= async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData) {
            const response = await categories_controller.getAllCategories(userData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all categories in servicess.....!", error)
        return errorResponse("Error in get all categories in servicess")
    }
};

// SEARCH  CATEGORIES DETAILS

const searchCategoriesDetails = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData) {
            const Response = await categories_controller.searchCategoriesDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search categories in  servicess.....!", error)
        return errorResponse("Error in search categories in  servicess")
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