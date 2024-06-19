const sub_categories_controller = require("../controller/sub_categories");
const { v4: uuidv4 } = require('uuid');
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")



// CREATE SUB CATEGORIES

const createSubCategories = async (userData) => {
    try {

        const userId = uuidv4();
        userData.body.sub_categories_id = userId;

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
                userData.body.sub_categories_image = userData.file.filename
            }

        const response = await sub_categories_controller.createSubCategories(userData.body);
        return successResponse(response);
    }}
    catch (error) {
        console.log("Error in create sub_categories in services..", error)
        return errorResponse("Error in create sub_categories in services..")
    }
}

// UPDATE  SUB CATEGORIES

const updateSubCategories = async (userData) => {
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
                const getUserDate = await sub_categories_controller.getSubCategoriesById(userData.body.sub_categories_id)

                if (getUserDate.sub_categories_image !== null) {
                    await deleteImage(getUserDate.sub_categories_image)
                    userData.body.sub_categories_image = userData.file.filename
                }
                else {
                    userData.body.sub_categories_image = userData.file.filename
                }
            }
            const updatedData = await sub_categories_controller.updateSubCategories(userData.body.sub_categories_id, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update sub_categories in servicess.....!", error)
        return errorResponse("Error in update sub_categories in servicess")
    }
};


// DELETE  SUB CATEGORIES

const deleteSubCategories= async (userData) => {
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
            const deletedData = await sub_categories_controller.deleteSubCategories(userData.body.sub_categories_id,)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete sub_categories in  servicess.....!", error)
        return errorResponse("Error in delete sub_categories in servicess")
    }
};


// GET  SUB CATEGORIES BY ID

const getSubCategoriesById = async (userData) => {
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
            const response = await sub_categories_controller.getSubCategoriesById(userData.body.sub_categories_id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id sub_categories in  servicess.....!", error)
        return errorResponse("Error in get by id sub_categories in servicess")
    }
};

// GET ALL  SUB CATEGORIES

const getAllSubCategories= async (userData) => {
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
            const response = await sub_categories_controller.getAllSubCategories(userData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all sub_categories in servicess.....!", error)
        return errorResponse("Error in get all sub_categories in servicess")
    }
};

// SEARCH  SUB CATEGORIES DETAILS

const searchSubCategoriesDetails = async (userData) => {
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
            const Response = await sub_categories_controller.searchSubCategoriesDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search sub_categories in  servicess.....!", error)
        return errorResponse("Error in search sub_categories in  servicess")
    }
};


module.exports = {
    createSubCategories,
    updateSubCategories,
    deleteSubCategories,
    getSubCategoriesById,
    getAllSubCategories,
    searchSubCategoriesDetails
}