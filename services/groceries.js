const groceries_controller = require("../controller/groceries");
const { v4: uuidv4 } = require('uuid');
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")



// CREATE GROCERIES

const createGroceries = async (userData) => {
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

        const response = await groceries_controller.createGroceries(userData.body);
        return successResponse(response);
    }}
    catch (error) {
        console.log("Error in create Groceries in services..", error)
        return errorResponse("Error in create Groceries in services..")
    }
}

// UPDATE GROCERIES

const updateGroceries = async (userData) => {
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
                const getUserDate = await groceries_controller.getGroceriesById(userData.body.product_id)

                if (getUserDate.product_image !== null) {
                    await deleteImage(getUserDate.product_image)
                    userData.body.product_image = userData.file.filename
                }
                else {
                    userData.body.product_image = userData.file.filename
                }
            }
            const updatedData = await groceries_controller.updateGroceries(userData.body.product_id, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update Groceries in servicess.....!", error)
        return errorResponse("Error in update Groceries in servicess")
    }
};


// DELETE GROCERIES

const deleteGroceries = async (userData) => {
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
            const deletedData = await groceries_controller.deleteGroceries(userData.body.product_id, userData.body)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete Groceries in  servicess.....!", error)
        return errorResponse("Error in delete Groceries in servicess")
    }
};


// GET GROCERIES BY ID

const getGroceriesById = async (userData) => {
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
            const response = await groceries_controller.getGroceriesById(userData.body.product_id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id Groceries in  servicess.....!", error)
        return errorResponse("Error in get by id Groceries in servicess")
    }
};

// GET ALL GROCERIES

const getAllGroceries = async (userData) => {
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
            const response = await groceries_controller.getAllGroceries(userData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all Groceries in servicess.....!", error)
        return errorResponse("Error in get all Groceries in servicess")
    }
};

// SEARCH GROCERIES DETAILS

const searchGroceriesDetails = async (userData) => {
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
            const Response = await groceries_controller.searchGroceriesDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search Groceries in  servicess.....!", error)
        return errorResponse("Error in search Groceries in  servicess")
    }
};


module.exports = {
    createGroceries,
    updateGroceries,
    deleteGroceries,
    getAllGroceries,
    getGroceriesById,
    searchGroceriesDetails
}