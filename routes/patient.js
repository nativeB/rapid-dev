'use strict';
const express = require('express');
const router = express.Router();
const {
      loginValidator,
      patientSignupValidator,
      issueCreationValidator
      } = require('../middleware/validator');
const {create,login,createIssue,getIssues} = require('../controllers/patient');
const {authPatient}=require('../middleware/auth')
router
.post('/signup',patientSignupValidator,create)
.post('/login',loginValidator,login)
.post('/issue',issueCreationValidator,createIssue)
.get('/issue',authPatient,getIssues)
module.exports = router;
