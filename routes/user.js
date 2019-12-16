'use strict';
const express = require('express');
// const User = require('../models/user');//user schema

const router = express.Router();

router.post('/user/login', async (req, res) => {
  // Create a new user
  try {
   //do something and res
   //  res.status(201).send({ });
  } catch (error) {
    // res.status(400).send(error);
  }
});

module.exports = router;
