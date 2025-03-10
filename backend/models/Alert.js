const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ["Evacuation", "Weather Warning", "New Shelter", "Other"],
    default: "Other",
  },
  timestamp: { type: Date, default: Date.now },
  recipients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Victim", // Alerts can be sent to specific victims
    },
  ],
});

module.exports = mongoose.model("Alert", alertSchema);
