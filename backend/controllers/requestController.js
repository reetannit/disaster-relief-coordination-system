const Request = require("../models/Request");

// Create a new victim request
// Create a new victim request

const createRequest = async (req, res) => {
  try {
    const { victimEmail, victimPhone, requestType, description, location, affectedPeople } = req.body;

    // Validate required fields
    if (!victimEmail || !requestType || !location || !location.coordinates || location.coordinates.length !== 2) {
      return res.status(400).json({ message: "Missing or invalid required fields." });
    }

    // Validate the 'location' field (coordinates should be in [longitude, latitude] format)
    const [longitude, latitude] = location.coordinates;
    if (typeof longitude !== "number" || typeof latitude !== "number" || Math.abs(longitude) > 180 || Math.abs(latitude) > 90) {
      return res.status(400).json({ message: "Invalid coordinates provided." });
    }

    // Validate affectedPeople (optional validation)
    if (typeof affectedPeople !== "number" || affectedPeople <= 0) {
      return res.status(400).json({ message: "Invalid number of affected people." });
    }

    // Create new request object based on the schema
    const newRequest = new Request({
      victimEmail,
      victimPhone,
      requestType,
      description,
      location: {
        type: "Point", // Required to indicate the GeoJSON type
        coordinates: location.coordinates, // Ensure the coordinates are in [longitude, latitude] format
      },
      affectedPeople, // Include affected people in the request
    });

    // Save the request to the database
    const savedRequest = await newRequest.save();

    // Respond with success
    res.status(201).json({ message: "Request created successfully.", data: savedRequest });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Error creating request.", error: error.message });
  }
};

module.exports = { createRequest };



// Get all requests
const getAllRequests = async (req, res) => {
  try {
   

    // Fetch all requests from the database
    const requests = await Request.find();


    // Check if no requests are found
    if (requests.length === 0) {
      return res.status(404).json({ message: "No requests found." });
    }

    // Send the requests data
    res.status(200).json({
     requests,
    });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({
      message: "Error fetching requests.",
      error: error.message,
    });
  }
};


// Get a single request by ID
const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    res.status(200).json({ message: "Request fetched successfully.", data: request });
  } catch (error) {
    res.status(500).json({ message: "Error fetching request.", error: error.message });
  }
};


//get request by email

const getRequestsByEmail =async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    // Replace this with your actual database query
    const requests = await Request.find({ victimEmail:email });
    res.status(200).json({ data: requests });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Server error." });
  }
};


const updateRequestStatus = async (req, res) => {
  try {
    const { id, status, ngoEmail } = req.body; 


    // Ensure the provided status is valid
    if (!['Pending', 'In Progress', 'Completed', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    // Prepare update fields
    const updateFields = { status };
    if (ngoEmail) {
      updateFields.ngoEmail = ngoEmail; // Update NGO email only if provided
    }

    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      updateFields,
      { new: true } // Ensures the updated document is returned
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found." });
    }

    res.status(200).json({ message: "Request status updated successfully.", data: updatedRequest });
  } catch (error) {
    res.status(500).json({ message: "Error updating request status.", error: error.message });
  }
};



// Assign an NGO to a request
const assignNgoToRequest = async (req, res) => {
  try {
    const { id} = req.body;
    const { ngoEmail } = req.body;

    if (!ngoEmail) {
      return res.status(400).json({ message: "NGO email is required." });
    }

    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { ngoEmail },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found." });
    }

    res.status(200).json({ message: "NGO assigned successfully.", data: updatedRequest });
  } catch (error) {
    res.status(500).json({ message: "Error assigning NGO.", error: error.message });
  }
};

// Delete a request
const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRequest = await Request.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ message: "Request not found." });
    }

    res.status(200).json({ message: "Request deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting request.", error: error.message });
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequestStatus,
  assignNgoToRequest,
  deleteRequest,
  getRequestsByEmail
};
