const mongoose = require("mongoose");

const EmergencySchema = new mongoose.Schema({
  email: { type: String, required: true },
  safetyStatus: { type: String, required: true },
  message: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Emergency", EmergencySchema);
