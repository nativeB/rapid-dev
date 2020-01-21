'use strict'
const express = require('express')
const router = express.Router()
const { loginValidator, issueUpdateValidator, adminSignupValidator } = require('../middleware/validator')
const { authSuperAdmin, authAdmin } = require('../middleware/auth')
const { create, login, invite, getAdmin, getIssues, updateIssue } = require('../controllers/admin')

router
  .post('/signup', adminSignupValidator, create)
  .post('/login', loginValidator, login)
  .post('/invite', authSuperAdmin, invite)
  .get('/issues', authAdmin, getIssues)
  .put('/issues/:id', authAdmin, issueUpdateValidator, updateIssue)
  .get('/', authAdmin, getAdmin)

module.exports = router
