'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const validator = require('validator');
const {throwError,httpStatus} = require('../utils');
const adminSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throwError(httpStatus.UNPROCESSABLE_ENTITY,'Invalid Email address' );
      }
    }
  },
  token: {
    type: String
  },
  photo: {
    type: String
  },
  password:{
    type:String,
    required:true
  }
}, { timestamps: true });

adminSchema.pre('save', async function (next) {
  // Hash the password before saving the admin model
  const admin = this
  if (admin.isModified('password')) {
      admin.password = await bcrypt.hash(admin.password, 8)
  }
  next()
});

adminSchema.methods.generateAuthToken = async function() {
  // Generate an auth token for the admin
  const admin = this
  const token = jwt.sign({_id: admin._id}, process.env.JWT_KEY)
  admin.token = token;
  await admin.save();
  return token
};

adminSchema.statics.authAdmin = async (email, pass) => {
  // Search for admin by email and password.
  const admin = await Admin.findOne({ email} );
  if (!admin) {
      return false
  }

  const isPasswordMatch = await bcrypt.compare(pass, admin.password);
  if (!isPasswordMatch) {
    return false
  }
  return admin
};
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
