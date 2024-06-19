const rice_controller = require("../controller/rice");
const { v4: uuidv4 } = require('uuid');
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")



// CREATE RICE

const createRice = async (userData) => {
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

        const response = await rice_controller.createRice(userData.body);
        return successResponse(response);
    }}
    catch (error) {
        console.log("Error in create Rice in services..", error)
        return errorResponse("Error in create Rice in services..")
    }
}

// UPDATE RICE

const updateRice = async (userData) => {
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
                const getUserDate = await rice_controller.getRiceById(userData.body.product_id)

                if (getUserDate.product_image !== null) {
                    await deleteImage(getUserDate.product_image)
                    userData.body.product_image = userData.file.filename
                }
                else {
                    userData.body.product_image = userData.file.filename
                }
            }
            const updatedData = await rice_controller.updateRice(userData.body.product_id, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update Rice in servicess.....!", error)
        return errorResponse("Error in update Rice in servicess")
    }
};


// DELETE RICE

const deleteRice = async (userData) => {
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
            const deletedData = await rice_controller.deleteRice(userData.body.product_id, userData.body)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete Rice in  servicess.....!", error)
        return errorResponse("Error in delete Rice in servicess")
    }
};


// GET RICE BY ID

const getRiceById = async (userData) => {
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
            const response = await rice_controller.getRiceById(userData.body.product_id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id Rice in  servicess.....!", error)
        return errorResponse("Error in get by id Rice in servicess")
    }
};

// GET ALL RICE

const getAllRice = async (userData) => {
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
            const response = await rice_controller.getAllRice(userData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all Rice in servicess.....!", error)
        return errorResponse("Error in get all Rice in servicess")
    }
};

// SEARCH RICE DETAILS

const searchRiceDetails = async (userData) => {
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
            const Response = await rice_controller.searchRiceDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search Rice in  servicess.....!", error)
        return errorResponse("Error in search Rice in  servicess")
    }
};


module.exports = {
    createRice,
    updateRice,
    deleteRice,
    getRiceById,
    getAllRice,
    searchRiceDetails
}