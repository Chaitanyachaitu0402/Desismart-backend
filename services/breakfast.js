const breakfast_controller = require("../controller/breakfast");
const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require('uuid');
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")



// CREATE BREAKFAST

const createBreakFast = async (userData) => {
    try {

        const userId = uuidv4();
        userData.body.product_id = userId;

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
                userData.body.product_image = userData.file.filename
            }

        const response = await breakfast_controller.createBreakFast(userData.body);
        return successResponse(response);
    }}
    catch (error) {
        console.log("Error in create breakfast in services..", error)
        return errorResponse("Error in create Groceries in services..")
    }
}

// UPDATE BREAKFAST

const updateBreakFast = async (userData) => {
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
                const getUserDate = await breakfast_controller.getBreakFastById(userData.body.product_id)

                if (getUserDate.product_image !== null) {
                    await deleteImage(getUserDate.product_image)
                    userData.body.product_image = userData.file.filename
                }
                else {
                    userData.body.product_image = userData.file.filename
                }
            }
            const updatedData = await breakfast_controller.updateBreakFast(userData.body.product_id, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update breakfast in servicess.....!", error)
        return errorResponse("Error in update breakfast in servicess")
    }
};


// DELETE BREAKFAST

const deleteBreakFast = async (userData) => {
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
            const deletedData = await breakfast_controller.deleteBreakFast(userData.body.product_id, userData.body)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete breakfast in  servicess.....!", error)
        return errorResponse("Error in delete breakfast in servicess")
    }
};


// GET BREAKFAST BY ID

const getBreakFastById = async (userData) => {
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
            const response = await breakfast_controller.getBreakFastById(userData.body.product_id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id breakfast in  servicess.....!", error)
        return errorResponse("Error in get by id breakfast in servicess")
    }
};

// GET ALL BREAKFAST

const getAllBreakFast = async (userData) => {
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
            const response = await breakfast_controller.getAllBreakFast(userData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all breakfast in servicess.....!", error)
        return errorResponse("Error in get all breakfast in servicess")
    }
};

// SEARCH BREAKFAST DETAILS

const searchBreakFastDetails = async (userData) => {
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
            const Response = await breakfast_controller.searchBreakFastDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search breakfast in  servicess.....!", error)
        return errorResponse("Error in search breakfast in  servicess")
    }
};


module.exports = {
    createBreakFast,
    updateBreakFast,
    deleteBreakFast,
    getBreakFastById,
    getAllBreakFast,
    searchBreakFastDetails
}