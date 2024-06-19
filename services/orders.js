const orders_controller = require("../controller/orders");
const { v4: uuidv4 } = require('uuid');
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")



// CREATE ORDERS

const createOrder = async (userData) => {
    try {

        const userId = uuidv4();
        userData.body.order_id = userId;

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
                userData.body.order_image = userData.file.filename
            }

        const response = await orders_controller.createOrder(userData.body);
        
        return successResponse(response);
    }}
    catch (error) {
        console.log("Error in create order in services..", error)
        return errorResponse("Error in create order in services..")
    }
}

// UPDATE ORDERS

const updateOrder = async (userData) => {
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

            const updatedData = await orders_controller.updateOrder(userData.body.order_id, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update order in servicess.....!", error)
        return errorResponse("Error in update order in servicess")
    }
};


// DELETE ORDERS

const deleteOrder = async (userData) => {
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
            const deletedData = await orders_controller.deleteOrder(userData.body.order_id, userData.body)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete order in  servicess.....!", error)
        return errorResponse("Error in delete order in servicess")
    }
};

// GET ORDERS BY ID

const getOrderById = async (userData) => {
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
            const response = await orders_controller.getOrderById(userData.body.order_id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id order in  servicess.....!", error)
        return errorResponse("Error in get by id order in servicess")
    }
};

// GET ALL ORDERS

const getAllOrder= async (userData) => {
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
            const response = await orders_controller.getAllOrder(userData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all order in servicess.....!", error)
        return errorResponse("Error in get all order in servicess")
    }
};

// SEARCH ORDERS DETAILS

const searchOrderDetails = async (userData) => {
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
            const Response = await orders_controller.searchOrderDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search order in  servicess.....!", error)
        return errorResponse("Error in search order in  servicess")
    }
};


module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderById,
    getAllOrder,
    searchOrderDetails
}