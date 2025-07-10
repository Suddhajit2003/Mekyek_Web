const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  qualifications: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobBenefits: {
    type: String,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  industryType: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  employmentType: {
    type: String,
    enum: ["Full-time", "Part-time", "Remote"],
    required: true,
  },
  roleCategory: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ["Permanent", "Project", "Internship"],
    required: true,
  },
  postedOn: {
    type: Date,
    default: Date.now,
  },
  company: {
    companyName: {
      type: String,
      required: true,
    },
    companyLogo: {
      type: String,
      required: true,
    },
    companyEmail: {
      type: String,
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  }
});

const JobModel = mongoose.model("Job", JobSchema);
module.exports = JobModel;
