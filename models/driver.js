const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  license: {
    type: String,
    required: true,
    unique: true
  },
  numberPhone: {
    type: String,
    required: true
  },
  assignedZone: {
    type: [String],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Driver", DriverSchema);