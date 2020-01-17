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
    if(validator.isEmail(req.body.email) && req.body.password && req.body.title && req.body.firstName && req.body.lastName){
        next();
    }else{
        console.log(validator.isEmail(req.body.email) ,req.body.password ,req.body.title,req.body.firstName , req.body.lastName)
        sendResponse(httpStatus.BAD_REQUEST,'bad request',null,res);
    }
}
const patientSignupValidator=(req, res, next)=>{
    if(validator.isEmail(req.body.email) && req.body.password){
        next();
    }else{
        sendResponse(httpStatus.BAD_REQUEST,'bad request',null,res);
    }
}
const issueCreationValidator=(req, res, next)=>{
    if(req.body.name&&req.body.details){
        next();
    }else{
        sendResponse(httpStatus.BAD_REQUEST,'bad request',null,res);
    }
}
module.exports = {
    loginValidator,
    adminSignupValidator,
    patientSignupValidator,
    issueCreationValidator
}