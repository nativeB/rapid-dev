'use strict';
const express = require('express');
const router = express.Router();
const {loginValidator,adminSignupValidator} = require('../middleware/validator');
const {authSuperAdmin} = require('../middleware/auth');
const {create,login,invite} = require('../controllers/admin');

router
.post('/signup',adminSignupValidator,create)
.post('/login',loginValidator,login)
.post('/invite',authSuperAdmin,invite);

module.exports = router;
