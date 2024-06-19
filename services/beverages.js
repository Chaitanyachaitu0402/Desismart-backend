const beverages_controller = require("../controller/beverages");
const { v4: uuidv4 } = require('uuid');
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")



// CREATE BEVERAGES

const createBeverages = async (userData) => {
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

        const response = await beverages_controller.createBeverages(userData.body);
        return successResponse(response);
    }}
    catch (error) {
        console.log("Error in create beverages in services..", error)
        return errorResponse("Error in create beverages in services..")
    }
}

// UPDATE BEVERAGES

const updateBeverages = async (userData) => {
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
                const getUserDate = await beverages_controller.getBeveragesById(userData.body.product_id)

                if (getUserDate.product_image !== null) {
                    await deleteImage(getUserDate.product_image)
                    userData.body.product_image = userData.file.filename
                }
                else {
                    userData.body.product_image = userData.file.filename
                }
            }
            const updatedData = await beverages_controller.updateBeverages(userData.body.product_id, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update beverages in servicess.....!", error)
        return errorResponse("Error in update beverages in servicess")
    }
};


// DELETE BEVERAGES

const deleteBeverages = async (userData) => {
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
            const deletedData = await beverages_controller.deleteBeverages(userData.body.product_id, userData.body)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete beverages in  servicess.....!", error)
        return errorResponse("Error in delete beverages in servicess")
    }
};


// GET BEVERAGES BY ID

const getBeveragesById = async (userData) => {
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
            const response = await beverages_controller.getBeveragesById(userData.body.product_id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id beverages in  servicess.....!", error)
        return errorResponse("Error in get by id beverages in servicess")
    }
};

// GET ALL BEVERAGES

const getAllBeverages = async (userData) => {
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
            const response = await beverages_controller.getAllBeverages(userData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all beverages in servicess.....!", error)
        return errorResponse("Error in get all beverages in servicess")
    }
};

// SEARCH BEVERAGES DETAILS

const searchBeveragesDetails = async (userData) => {
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
            const Response = await beverages_controller.searchBeveragesDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search beverages in  servicess.....!", error)
        return errorResponse("Error in search beverages in  servicess")
    }
};


module.exports = {
    createBeverages,
    updateBeverages,
    deleteBeverages,
    getBeveragesById,
    getAllBeverages,
    searchBeveragesDetails
}