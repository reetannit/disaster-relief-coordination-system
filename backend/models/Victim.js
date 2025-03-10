const mongoose = require("mongoose");

const victimSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String ,required: true},
  address: { type: String },
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
});

module.exports = mongoose.model("Victim", victimSchema);
