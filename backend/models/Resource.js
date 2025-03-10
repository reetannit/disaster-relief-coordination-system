// const mongoose = require("mongoose");

// const resourceSchema = new mongoose.Schema({
//   type: { type: String, required: true }, // e.g., Food, Water, Medicine
//   quantity: { type: Number, required: true },
//   location: { type: String, required: true }, // Location of the resource
//   ngo: { type: mongoose.Schema.Types.ObjectId, ref: "NGO" }, // Associated NGO
// });

// module.exports = mongoose.model("Resource", resourceSchema);


const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  resources: {
    food: { type: Number, default: 0 },
    water: { type: Number, default: 0 },
    clothes: { type: Number, default: 0 },
    medicines: { type: Number, default: 0 },
    equipment: { type: Number, default: 0 }
  }
});

const Resource = mongoose.model("Resource", resourceSchema);
module.exports = Resource;

