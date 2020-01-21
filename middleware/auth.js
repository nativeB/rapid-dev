// express middlewares here
const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')
const Patient = require('../models/patient')
const sendResponse = require('../utils').sendResponse
const authAdmin = async (req, res, next) => {
  try {
    const token = req.headers.token
    if (!token) throw Error()
    const data = jwt.verify(token, process.env.JWT_KEY)

    const admin = await Admin.findOne({ _id: data._id, token: token })
    if (!admin) {
      throw new Error()
    }
    req.admin = admin
    req.token = token
    next()
  } catch (error) {
    await sendResponse(401, 'Admin is unauthorised', null, res)
  }
}
const authPatient = async (req, res, next) => {
  try {
    const token = req.headers.token
    console.log(token)
    if (!token) throw Error()
    const data = jwt.verify(token, process.env.JWT_KEY)

    const patient = await Patient.findOne({ _id: data._id, token: token })
    if (!patient) {
      throw new Error()
    }
    req.patient = patient
    req.token = token
    next()
  } catch (error) {
    await sendResponse(401, 'Patient is unauthorised', null, res)
  }
}

const authSuperAdmin = async (req, res, next) => {
  const id = req.get('id')
  const pass = req.get('pass')
  if (id !== process.env.SUPER_ADMIN_ID || pass !== process.env.SUPER_ADMIN_PASS) {
    await sendResponse(401, 'unauthorised', null, res)
  } else {
    next()
  }
}

module.exports = {
  authAdmin,
  authPatient,
  authSuperAdmin
}
