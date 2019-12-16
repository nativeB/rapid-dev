'use strict';
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  displayName: {
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
  photoURL: {
    type: String
  },
  phoneNumber: {
    type: String
  },
}, { timestamps: true });

//sample find and delete
// userSchema.statics.findByCriteria = async (criteria) => {
  // Search for a user by email and password.
  // const user = await User.findOne(criteria);
  // if (!user) {
  //   throw new Error({ error: 'not valid' });
  // }
  //
  // return user;
// };
//
// userSchema.methods.deleteUser = async (id, update) => {
//   Search for a user by email and password.
  // const user = await User.findByIdAndDelete(id, update);
  // if (!user) {
  //   throw new Error({ error: 'User  does not exist' });
  // }
  // return user;
// };
const User = mongoose.model('User', userSchema);

module.exports = User;
