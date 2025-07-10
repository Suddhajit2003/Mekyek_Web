const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String },
  role: { type: String},
  department: { type: String},
  email: { type: String},
  phone: { type: String },
  location: { type: String },
  status: { type: String, enum: ['active', 'on-leave', 'inactive'], default: 'active' },
  joinDate: { type: Date, default: Date.now },
  performance: { type: Number, default: 0 },
  projects: { type: Number, default: 0 },
  tasks: { type: Number, default: 0 },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
});

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
