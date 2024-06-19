const sweets_savouries_controller = require("../controller/sweets_savouries");
const { v4: uuidv4 } = require('uuid');
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")



// CREATE SWEETS AND SAVOURIES

const createSweetsSavouries = async (userData) => {
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

        const response = await sweets_savouries_controller.createSweetsSavouries(userData.body);
        return successResponse(response);
    }}
    catch (error) {
        console.log("Error in create sweets-savouries in services..", error)
        return errorResponse("Error in create sweets-savouries in services..")
    }
}

// UPDATE SWEETS AND SAVOURIES

const updateSweetsSavouries = async (userData) => {
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
                const getUserDate = await sweets_savouries_controller.getSweetsSavouriesById(userData.body.product_id)

                if (getUserDate.product_image !== null) {
                    await deleteImage(getUserDate.product_image)
                    userData.body.product_image = userData.file.filename
                }
                else {
                    userData.body.product_image = userData.file.filename
                }
            }
            const updatedData = await sweets_savouries_controller.updateSweetsSavouries(userData.body.product_id, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update sweets-savouries in servicess.....!", error)
        return errorResponse("Error in update sweets-savouries in servicess")
    }
};


// DELETE SWEETS AND SAVOURIES

const deleteSweetsSavouries = async (userData) => {
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
            const deletedData = await sweets_savouries_controller.deleteSweetsSavouries(userData.body.product_id, userData.body)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete sweets-savouries in  servicess.....!", error)
        return errorResponse("Error in delete sweets-savouries in servicess")
    }
};


// GET SWEETS AND SAVOURIES BY ID

const getSweetsSavouriesById = async (userData) => {
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
            const response = await sweets_savouries_controller.getSweetsSavouriesById(userData.body.product_id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id sweets-savouries in  servicess.....!", error)
        return errorResponse("Error in get by id sweets-savouries in servicess")
    }
};

// GET ALL SWEETS AND SAVOURIES

const getAllSweetsSavouries = async (userData) => {
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
            const response = await sweets_savouries_controller.getAllSweetsSavouries(userData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all sweets-savouries in servicess.....!", error)
        return errorResponse("Error in get all sweets-savouries in servicess")
    }
};

// SEARCH SWEETS AND SAVOURIES DETAILS

const searchSweetsSavouriesDetails = async (userData) => {
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
            const Response = await sweets_savouries_controller.searchSweetsSavouriesDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search sweets-savouries in  servicess.....!", error)
        return errorResponse("Error in search sweets-savouries in  servicess")
    }
};


module.exports = {
    createSweetsSavouries,
    updateSweetsSavouries,
    deleteSweetsSavouries,
    getSweetsSavouriesById,
    getAllSweetsSavouries,
    searchSweetsSavouriesDetails
}