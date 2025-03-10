// const express = require("express");
// const {
//   createRequest,
//   getAllRequests,
//   getRequestById,
//   updateRequestStatus,
//   assignNgoToRequest,
//   deleteRequest,
// } = require("../controllers/requestController");

// const router = express.Router();

// // Route to create a new request
// router.post("/create", createRequest);

// // Route to get all requests
// router.get("/getallrequests", getAllRequests);

// // Route to get a single request by ID
// router.get("/:id", getRequestById);

// // Route to update the status of a request
// router.patch("/:id/status", updateRequestStatus);

// // Route to assign an NGO to a request
// router.post("/assignngo", assignNgoToRequest);

// // Route to delete a request
// router.delete("/:id", deleteRequest);

// module.exports = router;


const express = require("express");
const {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequestStatus,
  assignNgoToRequest,
  deleteRequest,
  getRequestsByEmail, // New controller function
} = require("../controllers/requestController");

 // Middleware to authenticate user

const router = express.Router();

// Route to create a new request
router.post("/create", createRequest);

// Route to get all requests
router.get("/getallrequests", getAllRequests);

// Route to get a single request by ID
router.get("/:id", getRequestById);

// Route to update the status of a request
router.patch("/updateStatus", updateRequestStatus);

// Route to assign an NGO to a request
router.post("/assignngo", assignNgoToRequest);

// Route to delete a request
router.delete("/:id", deleteRequest);

router.post("/getrequest",getRequestsByEmail)

// Route to get requests by logged-in user's email
router.post("/myrequests", getRequestsByEmail);

module.exports = router;
