const contact_controller = require("../controller/contact");
const { v4: uuidv4 } = require('uuid');
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")



// CREATE CONTACT

const createContact = async (userData) => {
    try {

        const userId = uuidv4();
        userData.body.id = userId;

        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        const response = await contact_controller.createContact(userData.body);
        return successResponse(response);
    }
    catch (error) {
        console.log("Error in create contact in services..", error)
        return errorResponse("Error in create contact in services..")
    }
}


// GET CONTACT BY ID

const getContactById = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
      
            const response = await contact_controller.getContactById(userData.body.id)
            return successResponse(response)
        
    } catch (error) {
        console.log("Error in get by id contact in  servicess.....!", error)
        return errorResponse("Error in get by id contact in servicess")
    }
};

// GET ALL CONTACT

const getAllContact = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
            const response = await contact_controller.getAllContact(userData.body)
            return successResponse(response)
        

    } catch (error) {
        console.log("Error in get all contact in servicess.....!", error)
        return errorResponse("Error in get all contact in servicess")
    }
};


module.exports = {
    createContact,
    getContactById,
    getAllContact
    
}