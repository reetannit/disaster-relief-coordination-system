const Emergency = require("../models/Emergency");

exports.sendEmergency = async (req, res) => {
  try {
    const { email, safetyStatus, message, phoneNumber, location } = req.body;

    if (!email || !safetyStatus || !message || !phoneNumber || !location) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newEmergency = new Emergency({
      email,
      safetyStatus,
      message,
      phoneNumber,
      location,
    });

    await newEmergency.save();
    res.status(201).json({ message: "Emergency alert sent successfully." });
  } catch (error) {
    console.error("Error sending emergency alert:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};


exports.getAllEmergencies = async (req, res) => {
  try {
    console.log("Fetching all emergency alerts...");
    const emergencies = await Emergency.find();
    res.status(200).json(emergencies);
  } catch (error) {
    console.error("Error fetching emergency alerts:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};


exports.getEmergenciesByEmail = async (req, res) => {
  try {
    const { email } = req.body; // Extract email from URL parameters

    console.log(`Fetching emergency alerts for email: ${email}...`);

    // Find emergencies based on the email
    const emergencies = await Emergency.find({ email });

    if (emergencies.length === 0) {
      return res.status(404).json({ message: "No emergency alerts found for this email." });
    }

    res.status(200).json(emergencies);
  } catch (error) {
    console.error("Error fetching emergency alerts by email:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};



exports.updateSafetyStatus = async (req, res) => {
  try {
    const { id, safetyStatus } = req.body;

    // Validate input fields
    if (!id || !safetyStatus) {
      return res.status(400).json({ error: "ID and safetyStatus are required." });
    }

    // Ensure that the safetyStatus is either 'Accepted' or 'Completed' (optional)
    const validStatuses = ['Accepted', 'Completed'];
    if (!validStatuses.includes(safetyStatus)) {
      return res.status(400).json({ error: "Invalid safetyStatus. Must be 'Accepted' or 'Completed'." });
    }

    // Find the alert by ObjectId and update its safetyStatus
    const alert = await Emergency.findById(id);

    if (!alert) {
      return res.status(404).json({ error: "Alert not found." });
    }

    // Update the safetyStatus
    alert.safetyStatus = safetyStatus;
    await alert.save(); // Save the updated alert

    // Respond with success message
    res.status(200).json({ message: `Alert status updated to '${safetyStatus}' successfully.` });
  } catch (error) {
    console.error("Error updating safetyStatus:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
