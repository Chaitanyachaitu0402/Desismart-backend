const funparty_controller = require("../controller/fun_party");
const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require('uuid');
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")



// CREATE FUN PARTY

const createFunParty = async (userData) => {
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

        const response = await funparty_controller.createFunParty(userData.body);
        return successResponse(response);
    }}
    catch (error) {
        console.log("Error in create fun and party in services..", error)
        return errorResponse("Error in create fun and party in services..")
    }
}

// UPDATE FUN PARTY

const updateFunParty  = async (userData) => {
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
                const getUserDate = await funparty_controller.getFunPartyById(userData.body.product_id)

                if (getUserDate.product_image !== null) {
                    await deleteImage(getUserDate.product_image)
                    userData.body.product_image = userData.file.filename
                }
                else {
                    userData.body.product_image = userData.file.filename
                }
            }
            const updatedData = await funparty_controller.updateFunParty(userData.body.product_id, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update fun and party in servicess.....!", error)
        return errorResponse("Error in update fun and party in servicess")
    }
};


// DELETE FUN PARTY

const deleteFunParty  = async (userData) => {
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
            const deletedData = await funparty_controller.deleteFunParty(userData.body.product_id, userData.body)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete fun and party in  servicess.....!", error)
        return errorResponse("Error in delete fun and party in servicess")
    }
};


// GET FUN PARTY BY ID

const getFunPartyById = async (userData) => {
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
            const response = await funparty_controller.getFunPartyById(userData.body.product_id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id fun and party in  servicess.....!", error)
        return errorResponse("Error in get by id fun and party in servicess")
    }
};

// GET ALL FUN PARTY

const getAllFunParty = async (userData) => {
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
            const response = await funparty_controller.getAllFunParty(userData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all fun and party in servicess.....!", error)
        return errorResponse("Error in get all fun and party in servicess")
    }
};

// SEARCH FUN PARTY DETAILS

const searchFunPartyDetails = async (userData) => {
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
            const Response = await funparty_controller.searchFunPartyDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search fun and party in  servicess.....!", error)
        return errorResponse("Error in search fun and party in  servicess")
    }
};


module.exports = {
    createFunParty,
    updateFunParty,
    deleteFunParty,
    getFunPartyById,
    getAllFunParty,
    searchFunPartyDetails
}