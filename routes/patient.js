'use strict';
const express = require('express');
const Patient = require('../models/patient');//patient schema

const router = express.Router();

router.post('/patient/signup', async (req, res) => {
  try {
   
   // res.status(201).send({ });
  } catch (error) {
    // res.status(400).send(error);
  }
});

module.exports = router;
