'use strict';
const mongoose = require('mongoose');
const validator = require('validator');

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
        throw new Error({ error: 'Invalid Email address' });
      }
    }
  },
  token: {
    type: String,
    required: true
  },
  photo: {
    type: String
  }
}, { timestamps: true });

// find
adminSchema.statics.findByCriteria = async (criteria) => {
  const admin = await Admin.findOne(criteria);
  if (!admin) {
    throw new Error({ error: 'not valid' });
  }
  
  return admin;
};

adminSchema.methods.deleteAdmin = async (id, update) => {
  const admin = await Admin.findByIdAndDelete(id, update);
  if (!admin) {
    throw new Error({ error: 'Admin  does not exist' });
  }
  return admin;
};

adminSchema.methods.generateAuthToken = async function() {
  // Generate an auth token for the user
  const admin = this
  const token = jwt.sign({_id: admin._id}, process.env.JWT_KEY)
  user.token = token;
  await admin.save();
  return token
};
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
