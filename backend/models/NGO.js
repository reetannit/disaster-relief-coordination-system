const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  location: {
    type: { 
      type: String, 
      enum: ['Point'], // GeoJSON type for a point
      required: true
    },
    coordinates: {
      type: [Number],  // [longitude, latitude]
      required: true
    }
  },
  resources: [{
    type: String, // Assuming resources are strings, can be customized as per requirements
  }],
  aidRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request' // Reference to Request model
  }]
}, { timestamps: true });

// Create a 2dsphere index on the location field
ngoSchema.index({ location: '2dsphere' });

module.exports = mongoose.model("NGO", ngoSchema);
