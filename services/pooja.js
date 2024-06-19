const pooja_controller = require("../controller/pooja");
const { v4: uuidv4 } = require('uuid');
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")



// CREATE POOJA

const createPooja = async (userData) => {
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

        const response = await pooja_controller.createPooja(userData.body);
        return successResponse(response);
    }}
    catch (error) {
        console.log("Error in create pooja in services..", error)
        return errorResponse("Error in create pooja in services..")
    }
}

// UPDATE POOJA

const updatePooja = async (userData) => {
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
                const getUserDate = await pooja_controller.getPoojaById(userData.body.product_id)

                if (getUserDate.product_image !== null) {
                    await deleteImage(getUserDate.product_image)
                    userData.body.product_image = userData.file.filename
                }
                else {
                    userData.body.product_image = userData.file.filename
                }
            }
            const updatedData = await pooja_controller.updatePooja(userData.body.product_id, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update pooja in servicess.....!", error)
        return errorResponse("Error in update pooja in servicess")
    }
};


// DELETE POOJA

const deletePooja = async (userData) => {
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
            const deletedData = await pooja_controller.deletePooja(userData.body.product_id, userData.body)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete pooja in  servicess.....!", error)
        return errorResponse("Error in delete pooja in servicess")
    }
};


// GET POOJA BY ID

const getPoojaById = async (userData) => {
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
            const response = await pooja_controller.getPoojaById(userData.body.product_id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id pooja in  servicess.....!", error)
        return errorResponse("Error in get by id pooja in servicess")
    }
};

// GET ALL POOJA

const getAllPooja = async (userData) => {
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
            const response = await pooja_controller.getAllPooja(userData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all pooja in servicess.....!", error)
        return errorResponse("Error in get all pooja in servicess")
    }
};

// SEARCH POOJA DETAILS

const searchPoojaDetails = async (userData) => {
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
            const Response = await pooja_controller.searchPoojaDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search pooja in  servicess.....!", error)
        return errorResponse("Error in search pooja in  servicess")
    }
};


module.exports = {
    createPooja,
    updatePooja,
    deletePooja,
    getPoojaById,
    getAllPooja,
    searchPoojaDetails
}