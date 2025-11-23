const mongoose = require("mongoose");

const RouteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: [String],
    required: true
  },
  municipality: {
    type: [String],
    required: true
  },
  mileage: {
    type: Number,
    required: true
  },
  estimatedTime: {
    type: Number,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  driver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Route", RouteSchema);