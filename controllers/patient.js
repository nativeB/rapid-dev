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
    req.body.patient=req.patient._id
    const issue  = new Issue(req.body);
    await issue.save()
    if(!issue) return await  await sendResponse(httpStatus.BAD_REQUEST,'Issue creation error,might be missing few fields',null,res);

    await sendResponse(httpStatus.OK,'Issue creation success',issue,res);
    } catch (error) {
        next(error);
    }
}
patient.getIssues = async (req, res,next) => {
    try{
     
    const issues  = await Issue.find({
        patient:req.patient._id}).populate({path:'responseBy'});

    await sendResponse(httpStatus.OK,'Successfully got issues',issues,res);
    } catch (error) {
        console.log(error)
        next(error);
    }
}
patient.updateIssue = async (req, res,next) => {
    try{
     
    const issue  = await Issue.findByIdAndUpdate(req.params.id,req.body,{new:true})

    await sendResponse(httpStatus.OK,'Successfully updated issues',issue,res);
    } catch (error) {
        console.log(error)
        next(error);
    }
}
patient.getPatient = async (req, res,next) => {
    try{
      const patient = await Patient.findById(req.patient).select('-password')
    await sendResponse(httpStatus.OK,'Successfully got issues',patient,res);
    } catch (error) {
        console.log(error)
        next(error);
    }
}


module.exports = patient;