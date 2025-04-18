const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const NGO = require("../models/NGO");
const Resource=require("../models/Resource") // Adjust path as per your project structure
const Request=require("../models/Request")

// Signup Controller

// Controller for NGO signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, phone, coordinates } = req.body;

    // Check if NGO already exists
    const existingNGO = await NGO.findOne({ email });
    if (existingNGO) {
      return res.status(400).json({ message: "NGO with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new NGO with the geolocation (coordinates)
    const newNGO = new NGO({
      name,
      email,
      password: hashedPassword,
      phone,
      verified:"false",
      location: {
        type: 'Point',
        coordinates: coordinates,  // Expected as [longitude, latitude]
      },
      resources: []  // Assuming you can add resources later or modify as needed
    });

    // Save the new NGO to the database
    await newNGO.save();

    res.status(201).json({
      message: "NGO registered successfully",
      ngo: {
        name: newNGO.name,
        email: newNGO.email,
        phone: newNGO.phone,
        location: newNGO.location,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if NGO exists
    const ngo = await NGO.findOne({ email });
    if (!ngo) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, ngo.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: ngo._id, email: ngo.email, verified: ngo.verified },
      "yourSecretKey",
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      email: ngo.email,
      name: ngo.name,
      verified: ngo.verified, // Include verified status
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Add Resources to NGO
// Create or update resource
exports.addResources=async (req, res) => {
  try {
    const { email, resources } = req.body;

    let resourceData = await Resource.findOne({ email });

    if (resourceData) {
      resourceData.resources = resources;
      await resourceData.save();
      return res.json({ message: "Resources updated successfully", resourceData });
    }
    
    const newResource = new Resource({ email, resources });
    await newResource.save();
    res.json({ message: "Resources created successfully", newResource });
  } catch (error) {
    console.error("Error creating/updating resource:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// Get Resources for an NGO
exports.getResources = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find NGO by email
    const resource= await Resource.findOne({ email });

    if (!resource) {
      return res.status(404).json({ message: "No resources found for this NGO" });
    }

    res.status(200).json({ resources: resource.resources });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


//get nearby ngos 

// Helper function to get nearby requests (based on NGO location)
const getNearbyRequests = async (ngoLocation) => {
  try {
    const nearbyRequests = await Request.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [ngoLocation.coordinates[0], ngoLocation.coordinates[1]] },
          distanceField: "distance",
          maxDistance: 100 * 1000, // 100 km in meters
          spherical: true,
        },
      },
    ]);
    return nearbyRequests;
  } catch (error) {
    console.error("Error fetching nearby requests:", error);
    return [];
  }
};

// Main function to find nearby requests for an NGO and return them
// Main function to find nearby requests for an NGO and return them
exports.getRequestsForNGO = async (req, res) => {
  try {
    const { email } = req.body; // Get the NGO email from the request body

    // Find the NGO by its email
    console.log("Get request for ngo")
    console.log(email)

    const ngo = await NGO.findOne({ email: email });
    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    // Directly access the coordinates from the ngo.location object
    const { coordinates } = ngo.location;

    if (!coordinates || coordinates.length !== 2) {
      return res.status(400).json({ message: "NGO location is missing or invalid" });
    }

    const [longitude, latitude] = coordinates;

    // Log the coordinates for debugging
    console.log(`NGO Coordinates: Latitude: ${latitude}, Longitude: ${longitude}`);

    // Find nearby requests based on the NGO's location
    const nearbyRequests = await Request.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [longitude, latitude] },  // Coordinates as [longitude, latitude]
          distanceField: "distance",  // Field that will hold the distance from the query point
          maxDistance: 100 * 1000, // Limit the search to 100 km
          spherical: true,  // Use spherical Earth for accurate distances
        },
      },
    ]);

    if (nearbyRequests.length === 0) {
      return res.status(404).json({ message: "No nearby requests found" });
    }

    // Send the list of nearby requests to the NGO
    res.status(200).json({
      nearbyRequests
    });
  } catch (error) {
    console.error("Error fetching requests for NGO:", error);
    res.status(500).json({ message: "Error fetching nearby requests", error });
  }
};


exports.getCompletedRequests = async (req, res) => {
  try {
    const { ngoEmail } = req.body;
     console.log(req.body)
    if (!ngoEmail) {
      return res.status(400).json({ message: "NGO email is required." });
    }

    // Fetch all requests where status is "Completed" and assigned to the given NGO email
    const completedRequests = await Request.find({ ngoEmail:ngoEmail });

    if (!completedRequests.length) {
      return res.status(404).json({ message: "No completed requests found for this NGO." });
    }

    res.status(200).json(completedRequests);
  } catch (error) {
    console.error("Error fetching completed requests:", error);
    res.status(500).json({ message: "Error fetching completed requests.", error: error.message });
  }
};
