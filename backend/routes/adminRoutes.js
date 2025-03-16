const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Admin signup route
router.post("/signup", adminController.signup);

// Admin login route
router.post("/login", adminController.login);


// Victim Routes
router.get("/victims", adminController.getAllVictims);
router.get("/victims/:id", adminController.getVictimById);
router.post("/victims", adminController.createVictim);
router.put("/victims/:id", adminController.updateVictim);
router.delete("/victims/:id", adminController.deleteVictim);

// Victim Request Routes
router.get("/victim-requests", adminController.getAllVictimRequests);
router.get("/victim-requests/:id", adminController.getVictimRequestById);
router.post("/victim-requests", adminController.createVictimRequest);
router.put("/victim-requests/:id", adminController.updateVictimRequest);
router.delete("/victim-requests/:id", adminController.deleteVictimRequest);

// NGO Routes
router.get("/ngos", adminController.getAllNGOs);
router.get("/ngos/:id", adminController.getNGOById);
router.post("/ngos", adminController.createNGO);
router.put("/ngos/:id", adminController.updateNGO);
router.delete("/ngos/:id", adminController.deleteNGO);

// Emergency Routes
router.get("/emergencies", adminController.getAllEmergencies);
router.get("/emergencies/:id", adminController.getEmergencyById);
router.post("/emergencies", adminController.createEmergency);
router.put("/emergencies/:id", adminController.updateEmergency);
router.delete("/emergencies/:id", adminController.deleteEmergency);


module.exports = router;
