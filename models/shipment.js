const mongoose = require("mongoose");

const ShipmentSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  trackingCode: {
    type: String,
    unique: true
  },
  shippingDate: {
    type: Date,
    default: Date.now
  },
  destinationAddress: {
    department: {
      type: String,
      required: true
    },
    municipality: {
      type: String,
      required: true
    },
    colonia: {
      type: String,
      required: true
    },
    details: {
      type: String
    }
  },
  weight: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  packageStatus: {
    type: String,
    enum: ["pendiente", "en ruta", "entregado", "devuelto"],
    default: "pendiente"
  },
  shippingHistory: [{
    changeDate: {
      type: Date,
      default: Date.now
    },
    location: {
      type: String,
      required: true
    },
    comments: {
      type: String,
      required: true
    }
  }],
  isCancelled: {
    type: Boolean,
    default: false
  },
  route_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: false,
    default: null
  }
});

// CORREGIR EL MIDDLEWARE - usar function() no arrow function
ShipmentSchema.pre('save', function(next) {
  if (!this.trackingCode) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 8).toUpperCase();
    this.trackingCode = `SH${timestamp}${random}`;
  }
  next();
});

module.exports = mongoose.model("Shipment", ShipmentSchema);