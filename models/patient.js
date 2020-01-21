'use strict'
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { throwError, httpStatus } = require('../utils')

const patientSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throwError(httpStatus.UNPROCESSABLE_ENTITY, 'Invalid Email address')
      }
    }
  },
  number: {
    type: String,
    validate: value => {
      if (!validator.isMobilePhone(value)) {
        throwError(httpStatus.UNPROCESSABLE_ENTITY, 'Invalid number')
      }
    }
  },
  token: {
    type: String
  },
  photoURL: {
    type: String
  },
  password: {
    type: String
  }
}, { timestamps: true })

patientSchema.pre('save', async function (next) {
  // Hash the password before saving the patient model
  const patient = this
  if (patient.isModified('password')) {
    patient.password = await bcrypt.hash(patient.password, 8)
  }
  next()
})

patientSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the patient
  const patient = this
  const token = jwt.sign({ _id: patient._id }, process.env.JWT_KEY)
  patient.token = token
  await patient.save()
  return token
}

patientSchema.statics.authPatient = async (email, pass) => {
  // Search for patient by email and password.
  const patient = await Patient.findOne({ email })
  if (!patient) {
    return false
  }
  const isPasswordMatch = await bcrypt.compare(pass, patient.password)
  if (!isPasswordMatch) {
    return false
  }
  return patient
}

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient
