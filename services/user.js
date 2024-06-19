const user_Controller = require("../controller/user");
const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require('uuid');
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")



// CREATE USER

const createUser = async (userData) => {
    try {
        const userId = uuidv4();
        userData.body.user_id = userId;

        if (userData.body.password) {
            userData.body.password = await passwordEncryption(userData.body.password)
        }
        // single image

        if (userData.file) {
            userData.body.profilepic = userData.file.filename
        }
        const response = await user_Controller.createUser(userData.body);
        return successResponse(response);
    }
    catch (error) {
        console.log("Error in create user in services..", error)
        return errorResponse("Error in create user in services..")
    }
}

// LOGIN PAGE

const userLogin = async (userData) => {

    try {
        const useremailController = await user_Controller.userLogin(userData.email)

        if (useremailController) {
            const validatePassword = await comparePassword(
                userData.password, useremailController.password)

            if (validatePassword) {

                const accessToken = await generateAccessToken(
                    useremailController.user_id,
                    useremailController.user_name,
                    useremailController.role)

                const refreshToken = await generateRefreshToken(
                    useremailController.user_id,
                    useremailController.user_name,
                    useremailController.role)

                const data = {
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }
                return successResponse(data)
            }
            else {

                return errorResponse("invalid password")
            }
        }
        else {
            return errorResponse("invalid Email")
        }

    } catch (error) {
        console.log("Error in user login servicess...!", error)
        return errorResponse("Error in user login servicess....")
    }
}

// UPDATE USER

const updateUser = async (userData) => {
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
                const getUserDate = await user_Controller.getUserById(userData.body.user_id)

                if (getUserDate.profilepic !== null) {
                    await deleteImage(getUserDate.profilepic)
                    userData.body.profilepic = userData.file.filename
                }
                else {
                    userData.body.profilepic = userData.file.filename
                }
            }
            const updatedData = await user_Controller.updateUser(userData.body.user_id, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update User in servicess.....!", error)
        return errorResponse("Error in update User in servicess")
    }
};

// DELETE USER

const deleteUser = async (userData) => {
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
            const deletedData = await user_Controller.deleteUser(userData.body.user_id, userData.body)
            return successResponse(deletedData)
        }
    } catch (error) {
        console.log("Error in delete User in  servicess.....!", error)
        return errorResponse("Error in delete User in  servicess")
    }
};

// GET USER BY ID

const getUserById = async (userData) => {
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
            const response = await user_Controller.getUserById(userData.body.user_id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id User in  servicess.....!", error)
        return errorResponse("Error in get by id User in servicess")
    }
};

// GET ALL USERS

const getAllUser = async (userData) => {
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
            const response = await user_Controller.getAllUser(userData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all User in  servicess.....!", error)
        return errorResponse("Error in get all User in servicess")
    }
};

// SEARCH EMPLOYE DETAILS

const searchUserDetails = async (userData) => {
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
            const employeeResponse = await user_Controller.searchUserDetails(userData.body)
            return successResponse(employeeResponse)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in surch User in servicess.....!", error)
        return errorResponse("Error in surch user in servicess")
    }
};

// COUNT

const countUserDetails = async (userData) => {
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
            const Response = await user_Controller.countUserDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in count in servicess.....!", error)
        return errorResponse("Error in count in servicess")
    }
};
// RESET PASSWORD

const resetPassword = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        const getUserDate = await user_Controller.getUserById(decodedData.user_id)
        const validatePassword = await comparePassword(
            userData.body.oldpassword,
            getUserDate.password)

        if (validatePassword) {
            if (userData.body.newpassword == userData.body.confirmpassword) {
                const hashedpassword = await passwordEncryption(userData.body.newpassword)
                const newpassword = { password: hashedpassword }
                const updateResetpassword = await user_Controller.updateUser(getUserDate.user_id, newpassword)
                return successResponse(updateResetpassword)
            }
            else {
                return errorResponse("conform password is not matched")
            }
        }
        else {
            return errorResponse("invalied Password")
        }
    }
    catch (error) {
        console.log("Error in reset password in  servicess.....!", error)
        return errorResponse("Error in reset password in  servicess")
    }
}

const generateAccessTokenUsingRefreshToken = async (userData) => {
    try {
      const token = userData.headers.authorization;
      if (!token) {
        return errorResponse("Missing token");
      }
      const decodedData = await verifyToken(
        token,
        process.env.JWT_REFRESH_TOKEN_SECRET_KEY
      );
      if (decodedData == "Invalid token") {
        return errorResponse(decodedData);
      }
      const accessToken = generateAccessToken(
        decodedData.user_id,
        decodedData.role,
        decodedData.name,
      );
      const refreshToken = generateRefreshToken(
        decodedData.user_id,
        decodedData.role,
        decodedData.name,
      );
      
      let data = {
        message: "Successfully generated access token using refresh token",
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      return successResponse(data);
    } catch (error) {
      console.log("Unable to generate access token", error);
      return errorResponse("Unable to generate access token");
    }
  };
  
  





// COMPARE PASSWORD

const comparePassword = async (password, encriptedpassword) => {
    try {
        const validatepassword = await bcrypt.compare(password, encriptedpassword)
        return validatepassword;
    } catch (error) {
        console.log("error in the compare password")
    }
}

// PASSWORD ENCRIPTION

const passwordEncryption = (password) => {
    saltRound = 10;
    const hashcode = bcrypt.hash(password, saltRound)
    console.log(hashcode)
    return hashcode;
}


module.exports = {
    createUser,
    userLogin,
    updateUser,
    searchUserDetails,
    deleteUser,
    countUserDetails,
    getAllUser,
    getUserById,
    resetPassword,
    generateAccessTokenUsingRefreshToken
   

}