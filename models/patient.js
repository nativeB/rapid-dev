'use strict';
const mongoose = require('mongoose');
const validator = require('validator');

const patientSchema = mongoose.Schema({
 first: {
    type: String,
    required: true,
    trim: true
  },
  last: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: 'Invalid Email address' });
      }
    }
  },
  number: {
    type: String,
    validate: value => {
      if(!validator.isMobilePhone(value)){
        throw new Error({error:'Invalid phone number'})
      }
    }
  },
  token: {
    type: String,
    required: true
  },
  photoURL: {
    type: String
  },
  phoneNumber: {
    type: String
  },
}, { timestamps: true });


patientSchema.statics.findByCriteria = async (criteria) => {
  //Search for a patient by email and password.
  const patient = await Patient.findOne(criteria);
  if (!patient) {
    throw new Error({ error: 'not valid' });
  }
  
  return patient;
};

patientSchema.methods.deletePatient = async (id, update) => {
//   Search for a patient by email and password.
  const patient = await Patient.findByIdAndDelete(id, update);
  if (!patient) {
    throw new Error({ error: 'Patient  does not exist' });
  }
  return patient;
};
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
