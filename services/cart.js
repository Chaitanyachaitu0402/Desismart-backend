const cart_controller = require("../controller/cart");
const { v4: uuidv4 } = require('uuid');
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")



// CREATE CART

const createCart = async (userData) => {
    try {

        const userId = uuidv4();
        userData.body.cart_id = userId;

        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData){

            if (userData.file) {
                userData.body.cart_image = userData.file.filename
            }

        const response = await cart_controller.createCart(userData.body);
        return successResponse(response);
    }}
    catch (error) {
        console.log("Error in create cart in services..", error)
        return errorResponse("Error in create cart in services..")
    }
}

// UPDATE CART

const updateCart = async (userData) => {
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

            if (userData.file) {
                const getUserDate = await cart_controller.getCartById(userData.body.cart_id)

                if (getUserDate.cart_image !== null) {
                    await deleteImage(getUserDate.cart_image)
                    userData.body.cart_image = userData.file.filename
                }
                else {
                    userData.body.cart_image = userData.file.filename
                }
            }
            const updatedData = await cart_controller.updateCart(userData.body.cart_id, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update cart in servicess.....!", error)
        return errorResponse("Error in update cart in servicess")
    }
};


// DELETE CART

const deleteCart = async (userData) => {
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
            const deletedData = await cart_controller.deleteCart(userData.body.cart_id, userData.body)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete cart in  servicess.....!", error)
        return errorResponse("Error in delete cart in servicess")
    }
};


// GET CART BY ID

const getCartById = async (userData) => {
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
            const response = await cart_controller.getCartById(userData.body.cart_id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id cart in  servicess.....!", error)
        return errorResponse("Error in get by id cart in servicess")
    }
};

// GET ALL CART

const getAllCart = async (userData) => {
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
            const response = await cart_controller.getAllCart(userData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all cart in servicess.....!", error)
        return errorResponse("Error in get all cart in servicess")
    }
};

// SEARCH CART DETAILS

const searchCartDetails = async (userData) => {
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
            const Response = await cart_controller.searchCartDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search cart in  servicess.....!", error)
        return errorResponse("Error in search cart in  servicess")
    }
};


module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getCartById,
    getAllCart,
    searchCartDetails
}