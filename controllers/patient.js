const Patient = require('../models/patient');//patient schema
const Issue = require('../models/issue');//patient schema
const {sendResponse} = require('../utils');
const {httpStatus} = require('../utils');
const patient = {};

patient.create = async (req,res,next)=>{
    try {
        //create new patient
        const patient = new Patient(req.body);
        await patient.save();
        await sendResponse(httpStatus.CREATED,'Patient added',patient,res);
        } catch (error) {
          next(error);
        }
}
patient.login = async (req, res,next) => {
    try{
    const patient = await Patient.authPatient(req.body.email,req.body.password);
    if(!patient) return await  await sendResponse(httpStatus.NOT_FOUND,'Wrong email or password',null,res);

   patient.token = await patient.generateAuthToken();
    await sendResponse(httpStatus.OK,'Patient login success',patient,res);
    } catch (error) {
        next(error);
    }
}
patient.createIssue = async (req, res,next) => {
    try{
    const issue  = new Issue(req.body);
    await issue.save()
    if(!issue) return await  await sendResponse(httpStatus.BAD_REQUEST,'Issue creation error,might be missing few fields',null,res);

    await sendResponse(httpStatus.OK,'Patient login success',patient,res);
    } catch (error) {
        next(error);
    }
}
patient.getIssues = async (req, res,next) => {
    try{
    const issues  = Issue.find({patient:req.patient._id})

    await sendResponse(httpStatus.OK,'Patient login success',issues,res);
    } catch (error) {
        next(error);
    }
}


module.exports = patient;