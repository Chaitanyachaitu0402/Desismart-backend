const jwt = require("jsonwebtoken")

const generateAccessToken=(user_id,user_name,role)=>{
    const token = jwt.sign( {user_id,user_name,role},process.env.JWT_TOKEN_SECRETE_KEY,{expiresIn:"3h"})
    return token
}

const generateRefreshToken=(user_id,user_name,role)=>{
    const token = jwt.sign( {user_id,user_name,role},process.env.JWT_REFRESH_SECRETE_KEY,{expiresIn:"1day"})
    return token
}

const verifyToken = (accessToken,secreateKey)=>{
    try {
        const formattedToken = accessToken.replace("Bearer ","")
        const decode= jwt.verify(formattedToken,process.env.JWT_TOKEN_SECRETE_KEY)
        return decode
    } catch (error) {
       return "invalidtoken"; 
    }
}



module.exports={
 generateAccessToken,
 generateRefreshToken,
 verifyToken

}