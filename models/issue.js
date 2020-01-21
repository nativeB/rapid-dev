'use strict';
const mongoose = require('mongoose');

const issueSchema = mongoose.Schema({
  details: {
    type: String,
    required: true,
  },
  patient: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true},
  status: {type: String,default:'new', enum:['new','answered','resolved']},
  response: {type: String},
  responseBy:{type: mongoose.Schema.Types.ObjectId, ref: 'Admin'},
  
}, { timestamps: true });

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;