'use strict';
const express = require('express');
const router = express.Router();
const {
      loginValidator,
      userSignupValidator,
      issueCreationValidator
      } = require('../middleware/validator');
const {create,login,createIssue} = require('../controllers/patient');

router
.post('/signup',userSignupValidator,create)
.post('/login',loginValidator,login)
.post('/issue',issueCreationValidator,createIssue);

module.exports = router;
