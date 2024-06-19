const fruits_controller = require("../controller/fruits");
const { v4: uuidv4 } = require('uuid');
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")



// CREATE FRUITS

const createFruits = async (userData) => {
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

        const response = await fruits_controller.createFruits(userData.body);
        return successResponse(response);
    }}
    catch (error) {
        console.log("Error in create fruits in services..", error)
        return errorResponse("Error in create fruits in services..")
    }
}

// UPDATE FRUITS

const updateFruits = async (userData) => {
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
                const getUserDate = await fruits_controller.getFruitsById(userData.body.product_id)

                if (getUserDate.product_image !== null) {
                    await deleteImage(getUserDate.product_image)
                    userData.body.product_image = userData.file.filename
                }
                else {
                    userData.body.product_image = userData.file.filename
                }
            }
            const updatedData = await fruits_controller.updateFruits(userData.body.product_id, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update breakfast in servicess.....!", error)
        return errorResponse("Error in update breakfast in servicess")
    }
};


// DELETE FRUITS

const deleteFruits = async (userData) => {
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
            const deletedData = await fruits_controller.deleteFruits(userData.body.product_id)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete fruits in  servicess.....!", error)
        return errorResponse("Error in delete fruits in servicess")
    }
};


// GET FRUITS BY ID

const getFruitsById = async (userData) => {
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
            const response = await fruits_controller.getFruitsById(userData.body.product_id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id fruits in  servicess.....!", error)
        return errorResponse("Error in get by id fruits in servicess")
    }
};

// GET ALL FRUITS

const getAllFruits = async (userData) => {
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
            const response = await fruits_controller.getAllFruits(userData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all fruits in servicess.....!", error)
        return errorResponse("Error in get all fruits in servicess")
    }
};

// SEARCH FRUITS DETAILS

const searchFruitsDetails = async (userData) => {
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
            const Response = await fruits_controller.searchFruitsDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search fruits in  servicess.....!", error)
        return errorResponse("Error in search fruits in  servicess")
    }
};


module.exports = {
    createFruits,
    updateFruits,
    deleteFruits,
    getFruitsById,
    getAllFruits,
    searchFruitsDetails
}