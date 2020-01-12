'use strict';
const express = require('express');
const Admin = require('../models/admin');//admin schema

const router = express.Router();

router.post('/admin/new', async (req, res) => {
  // Create a new hospitail
  try {
   //do something and res
   //  res.status(201).send({ });
  } catch (error) {
    // res.status(400).send(error);
  }
});

module.exports = router;
