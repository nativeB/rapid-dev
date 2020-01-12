'use strict';
const mongoose = require('mongoose');
const validator = require('validator');

const hospitalSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

// find
hospitalSchema.statics.findByCriteria = async (criteria) => {
  const hospital = await Admin.findOne(criteria);
  if (!hospital) {
    throw new Error({ error: 'not valid' });
  }
  
  return hospital;
};

hospitalSchema.methods.deleteAdmin = async (id, update) => {
  const hospital = await Admin.findByIdAndDelete(id, update);
  if (!hospital) {
    throw new Error({ error: 'Admin  does not exist' });
  }
  return hospital;
};


const Admin = mongoose.model('Admin', hospitalSchema);

module.exports = Admin;
