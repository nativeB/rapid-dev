const validator = require('validator');
const {httpStatus,sendResponse} = require('../utils');
const loginValidator = (req,res,next) =>{
    try{
    if(validator.isEmail(req.body.email) && req.body.password){
        next();
    }else{
        sendResponse(httpStatus.BAD_REQUEST,'bad request',null,res);
    }
}catch(e){
    
    sendResponse(httpStatus.BAD_REQUEST,'bad request',null,res);
}
}
const adminSignupValidator=(req, res, next)=>{
    if(validator.isEmail(req.body.email) && req.body.password && req.body.bio && req.body.title){
        next();
    }else{
        sendResponse(httpStatus.BAD_REQUEST,'bad request',null,res);
    }
}
module.exports = {
    loginValidator,
    adminSignupValidator
}