//express middlewares here
const jwt = require('jsonwebtoken')
const Admin = require('../models/user')
const Patient = require('../models/patient')

const authAdmin = async(req, res, next) => {
    try {
    const token = req.cookies.token
        if(!token) throw Error()
        const data = jwt.verify(token, process.env.JWT_KEY)

            const admin = await Admin.findOne({_id: data._id, 'token': token})
            if (!admin) {
                throw new Error()
            }
            req.admin = admin
            req.token = token
            next()
        } catch (error) {
        res.clearCookie('token')
        console.log('cookie cleared')
        return res.status(401).end()
        }

}
const authPatient = async(req, res, next) => {
    try {
    const token = req.cookies.token
        if(!token) throw Error()
        const data = jwt.verify(token, process.env.JWT_KEY)

            const patient = await Patient.findOne({_id: data._id, 'token': token})
            if (!patient) {
                throw new Error()
            }
            req.patient = patient
            req.token = token
            next()
        } catch (error) {
        console.log(error)
        res.clearCookie('token')
        console.log('cookie cleared')
        return res.status(401).end();    
    }
}
module.exports = {
  authAdmin,
  authPatient
}

