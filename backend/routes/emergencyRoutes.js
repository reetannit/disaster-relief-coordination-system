const express = require("express");
const router = express.Router();
const {sendEmergency, getAllEmergencies, updateSafetyStatus, getEmergenciesByEmail}= require("../controllers/emergencyController");

// Admin signup route
router.post("/sendemergency", sendEmergency);
router.get("/emergencies",getAllEmergencies)
router.patch("/updateStatus",updateSafetyStatus)
router.post("/myemergencyrequest",getEmergenciesByEmail)

module.exports = router;
