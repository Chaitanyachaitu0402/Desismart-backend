const vegetables_controller = require("../controller/vegetables");
const { v4: uuidv4 } = require('uuid');
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")



// CREATE VEGETABLES

const createVegetables = async (userData) => {
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

        const response = await vegetables_controller.createVegetables(userData.body);
        return successResponse(response);
    }}
    catch (error) {
        console.log("Error in create vegetables in services..", error)
        return errorResponse("Error in create vegetables in services..")
    }
}

// UPDATE VEGETABLES

const updateVegetables = async (userData) => {
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
                const getUserDate = await vegetables_controller.getVegetablesById(userData.body.product_id)

                if (getUserDate.product_image !== null) {
                    await deleteImage(getUserDate.product_image)
                    userData.body.product_image = userData.file.filename
                }
                else {
                    userData.body.product_image = userData.file.filename
                }
            }
            const updatedData = await vegetables_controller.updateVegetables(userData.body.product_id, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update vegetables in servicess.....!", error)
        return errorResponse("Error in update vegetables in servicess")
    }
};


// DELETE VEGETABLES

const deleteVegetables = async (userData) => {
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
            const deletedData = await vegetables_controller.deleteVegetables(userData.body.product_id, userData.body)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete vegetables in  servicess.....!", error)
        return errorResponse("Error in delete vegetables in servicess")
    }
};


// GET VEGETABLES BY ID

const getVegetablesById = async (userData) => {
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
            const response = await vegetables_controller.getVegetablesById(userData.body.product_id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id vegetables in  servicess.....!", error)
        return errorResponse("Error in get by id vegetables in servicess")
    }
};

// GET ALL VEGETABLES

const getAllVegetables = async (userData) => {
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
            const response = await vegetables_controller.getAllVegetables(userData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all vegetables in servicess.....!", error)
        return errorResponse("Error in get all vegetables in servicess")
    }
};

// SEARCH VEGETABLES DETAILS

const searchVegetablesDetails = async (userData) => {
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
            const Response = await vegetables_controller.searchVegetablesDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search vegetables in  servicess.....!", error)
        return errorResponse("Error in search vegetables in  servicess")
    }
};


module.exports = {
    createVegetables,
    updateVegetables,
    deleteVegetables,
    getVegetablesById,
    getAllVegetables,
    searchVegetablesDetails
}