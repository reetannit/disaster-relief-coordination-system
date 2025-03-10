const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  victimEmail: { type: String, required: true },
  victimPhone: { type: String, required: true },
  requestType: { 
    type: String, 
    enum: ['Food', 'Water', 'Shelter', 'Medical', 'Clothing', 'Other'] 
  },
  description: { 
    type: String, 
    maxlength: 500, 
    default: 'No additional details provided.' 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Completed', 'Rejected'], 
    default: 'Pending' 
  },
  ngoEmail: { 
    type: String, 
    default: null 
  }, // Initially, no NGO is assigned
  location: {
    type: { 
      type: String, 
      enum: ['Point'], 
      required: true 
    },
    coordinates: { 
      type: [Number], 
      required: true 
    } // [longitude, latitude]
  },
  affectedPeople: { 
    type: Number, 
    required: true 
  },
}, { timestamps: true });

// Create 2dsphere index on location.coordinates
requestSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Request', requestSchema);
