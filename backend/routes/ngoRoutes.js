const express = require("express");
const router = express.Router();
const {
  addResources,
  getResources,
  signup,
  login,
  getRequestsForNGO,
  getCompletedRequests,
} = require("../controllers/ngoController");

router.post("/signup", signup);
router.post("/signin", login); // Fixed: Renamed signin to login
router.post("/get-resources", getResources);
router.post("/create-resources",addResources);

router.post("/ngoRequests/",getRequestsForNGO)
router.post("/ngohistory",getCompletedRequests)



module.exports = router;
