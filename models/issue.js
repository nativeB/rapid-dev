'use strict';
const mongoose = require('mongoose');

const issueSchema = mongoose.Schema({
 title: {
    type: String,
    required: true,
    trim: true
  },
  detail: {
    type: String,
    required: true,
    trim: true
  },
  patient: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true}
}, { timestamps: true });


const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
