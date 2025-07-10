const mongoose = require('mongoose');

const CompanyJobSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true
  },
  applicants: {
    type: Number,
    default: 0
  },
  postedOn: {
    type: Date,
    default: Date.now
  },
  postedBy: {
    type: String,
    required: true
  },
  rejected: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobApply' // Storing rejected applicants' IDs
  }],
  onHold: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobApply' // Storing on-hold applicants' IDs
  }],
  interviewPending: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobApply' // Storing interview pending applicants' IDs
  }],
  interviewPassed: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobApply' // Storing interview passed applicants' IDs
  }],
  hired: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobApply' // Storing hired applicants' IDs
  }],
  totalCandidates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobApply' // Storing all applicants' IDs
  }],
  activeCandidates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobApply' // Storing active applicants' IDs
  }],
  location: {
    type: String,
    required: true
  }
});

const CompanyJob = mongoose.model('CompanyJob', CompanyJobSchema);
module.exports = CompanyJob;
