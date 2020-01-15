'use strict';
const mongoose = require('mongoose');
const validator = require('validator');

const inviteSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: 'Invalid Email address' });
      }
    },
    title: { type: String }
  }
}, { timestamps: true });


const Invite = mongoose.model('Invite', inviteSchema);

module.exports = Invite;
