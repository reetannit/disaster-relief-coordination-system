const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin"); // Adjust path as per project structure

// Signup Controller
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully", admin: newAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id, email: admin.email }, "yourSecretKey", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token, admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

//get all ngo
// AdminController.js
const Victim = require("../models/Victim");
const VictimRequest = require("../models/Request");
const NGO = require("../models/NGO");
const Emergency = require("../models/Emergency");

/* =====================================================
   Victim CRUD Operations
===================================================== */

// Get all victims
exports.getAllVictims = async (req, res) => {
  try {
    const victims = await Victim.find();
    res.status(200).json(victims);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get a victim by ID
exports.getVictimById = async (req, res) => {
  try {
    const victim = await Victim.findById(req.params.id);
    if (!victim) return res.status(404).json({ message: "Victim not found" });
    res.status(200).json(victim);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Create a new victim
exports.createVictim = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    // Optionally hash password before saving
    const newVictim = new Victim({ name, email, password, phone });
    await newVictim.save();
    res.status(201).json(newVictim);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Update a victim
exports.updateVictim = async (req, res) => {
  try {
    const updatedVictim = await Victim.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVictim) return res.status(404).json({ message: "Victim not found" });
    res.status(200).json(updatedVictim);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete a victim
exports.deleteVictim = async (req, res) => {
  try {
    const deletedVictim = await Victim.findByIdAndDelete(req.params.id);
    if (!deletedVictim) return res.status(404).json({ message: "Victim not found" });
    res.status(200).json({ message: "Victim deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

/* =====================================================
   Victim Request CRUD Operations
===================================================== */

// Get all victim requests
exports.getAllVictimRequests = async (req, res) => {
  try {
    const requests = await VictimRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get a victim request by ID
exports.getVictimRequestById = async (req, res) => {
  try {
    const request = await VictimRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Victim request not found" });
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Create a new victim request
exports.createVictimRequest = async (req, res) => {
  try {
    const newRequest = new VictimRequest(req.body);
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Update a victim request
exports.updateVictimRequest = async (req, res) => {
  try {
    const updatedRequest = await VictimRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRequest) return res.status(404).json({ message: "Victim request not found" });
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete a victim request
exports.deleteVictimRequest = async (req, res) => {
  try {
    const deletedRequest = await VictimRequest.findByIdAndDelete(req.params.id);
    if (!deletedRequest) return res.status(404).json({ message: "Victim request not found" });
    res.status(200).json({ message: "Victim request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

/* =====================================================
   NGO CRUD Operations
===================================================== */

// Get all NGOs
exports.getAllNGOs = async (req, res) => {
  try {
    const ngos = await NGO.find();
    res.status(200).json(ngos);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get an NGO by ID
exports.getNGOById = async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.id);
    if (!ngo) return res.status(404).json({ message: "NGO not found" });
    res.status(200).json(ngo);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Create a new NGO
exports.createNGO = async (req, res) => {
  try {
    const newNGO = new NGO(req.body);
    await newNGO.save();
    res.status(201).json(newNGO);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Update an NGO
exports.updateNGO = async (req, res) => {
  try {
    const updatedNGO = await NGO.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedNGO) return res.status(404).json({ message: "NGO not found" });
    res.status(200).json(updatedNGO);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete an NGO
exports.deleteNGO = async (req, res) => {
  try {
    const deletedNGO = await NGO.findByIdAndDelete(req.params.id);
    if (!deletedNGO) return res.status(404).json({ message: "NGO not found" });
    res.status(200).json({ message: "NGO deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

/* =====================================================
   Emergency CRUD Operations
===================================================== */

// Get all emergencies
exports.getAllEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find();
    res.status(200).json(emergencies);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get an emergency by ID
exports.getEmergencyById = async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id);
    if (!emergency) return res.status(404).json({ message: "Emergency not found" });
    res.status(200).json(emergency);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Create a new emergency
exports.createEmergency = async (req, res) => {
  try {
    const newEmergency = new Emergency(req.body);
    await newEmergency.save();
    res.status(201).json(newEmergency);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Update an emergency
exports.updateEmergency = async (req, res) => {
  try {
    const updatedEmergency = await Emergency.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEmergency) return res.status(404).json({ message: "Emergency not found" });
    res.status(200).json(updatedEmergency);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete an emergency
exports.deleteEmergency = async (req, res) => {
  try {
    const deletedEmergency = await Emergency.findByIdAndDelete(req.params.id);
    if (!deletedEmergency) return res.status(404).json({ message: "Emergency not found" });
    res.status(200).json({ message: "Emergency deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
