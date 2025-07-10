const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  name: { type: String },
  category: { type: String },
  type: { type: String },
  size: { type: String }, // e.g., "2.4 MB"
  date: { type: Date, default: Date.now },
  author: { type: String },
  starred: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  filePath: { type: String },
  companyId: { type: String },
});

module.exports = mongoose.model("Document", DocumentSchema);
