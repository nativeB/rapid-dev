'use strict'
const express = require('express')
const router = express.Router()
const {
  loginValidator,
  patientSignupValidator,
  issueCreationValidator,
  issueUpdateValidator
} = require('../middleware/validator')
const { create, login, createIssue, getIssues, getPatient, updateIssue } = require('../controllers/patient')
const { authPatient } = require('../middleware/auth')
router
  .post('/signup', patientSignupValidator, create)
  .post('/login', loginValidator, login)
  .post('/issue', authPatient, issueCreationValidator, createIssue)
  .get('/issue', authPatient, getIssues)
  .put('/issue/:id', authPatient, issueUpdateValidator, updateIssue)
  .get('/', authPatient, getPatient)

module.exports = router
