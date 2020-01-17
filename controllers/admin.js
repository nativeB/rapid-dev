const Admin = require('../models/admin');//admin schema
const Invite = require('../models/invite');//admin schema
const {sendResponse} = require('../utils');
const {httpStatus} = require('../utils');
const admin = {};

admin.create = async (req,res,next)=>{
    try {
        //create new admin
        const admin = new Admin(req.body);
        await admin.save();
        await sendResponse(httpStatus.CREATED,'Admin added',admin,res);
        } catch (error) {
            console.log(error)
          next(error);
        }
}
admin.login = async (req, res,next) => {
    try{
    const admin = await Admin.authAdmin(req.body.email,req.body.password);
    if(!admin) return  await sendResponse(httpStatus.NOT_FOUND,'Wrong email or password',null,res);

    admin.token = await admin.generateAuthToken();
    await sendResponse(httpStatus.OK,'Admin login success',admin,res);
    } catch (error) {
        
    console.log(error)
        next(error);
    }
}
admin.invite = async (req,res,next) =>{
    try{
     const {email} = req.body;
     const admin = await Admin.findOne({email})||await Invite.findOne({email});
   
     if(admin){
        return await sendResponse(httpStatus.NOT_ACCEPTABLE,'Admin with id already exist',null,res);
    }
    const invite = new Invite(req.body);
    await invite.save();
    await sendResponse(httpStatus.CREATED,'Admin added',invite,res);
}catch(error){
    next(error)
}

}

module.exports = admin;