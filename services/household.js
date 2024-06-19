const household_controller = require("../controller/household");
const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require('uuid');
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")



// CREATE HOUSEHOLD

const createHouseHold = async (userData) => {
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

        const response = await household_controller.createHouseHold(userData.body);
        return successResponse(response);
    }}
    catch (error) {
        console.log("Error in create Household in services..", error)
        return errorResponse("Error in create Household in services..")
    }
}

// UPDATE HOUSEHOLD

const updateHouseHold  = async (userData) => {
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
                const getUserDate = await household_controller.getHouseHoldById(userData.body.product_id)

                if (getUserDate.product_image !== null) {
                    await deleteImage(getUserDate.product_image)
                    userData.body.product_image = userData.file.filename
                }
                else {
                    userData.body.product_image = userData.file.filename
                }
            }
            const updatedData = await household_controller.updateHouseHold(userData.body.product_id, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update Household in servicess.....!", error)
        return errorResponse("Error in update Household in servicess")
    }
};


// DELETE HOUSEHOLD

const deleteHouseHold  = async (userData) => {
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
            const deletedData = await household_controller.deleteHouseHold(userData.body.product_id, userData.body)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete Household in  servicess.....!", error)
        return errorResponse("Error in delete Household in servicess")
    }
};


// GET HOUSEHOLD BY ID

const getHouseHoldById = async (userData) => {
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
            const response = await household_controller.getHouseHoldById(userData.body.product_id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id Household in  servicess.....!", error)
        return errorResponse("Error in get by id Household in servicess")
    }
};

// GET ALL HOUSEHOLD

const getAllHouseHold  = async (userData) => {
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
            const response = await household_controller.getAllHouseHold(userData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all Household in servicess.....!", error)
        return errorResponse("Error in get all Household in servicess")
    }
};

// SEARCH HOUSEHOLD DETAILS

const searchHouseHoldDetails = async (userData) => {
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
            const Response = await household_controller.searchHouseHoldDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search Household in  servicess.....!", error)
        return errorResponse("Error in search Household in  servicess")
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