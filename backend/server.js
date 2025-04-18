const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Import mongoose
const victimRoutes = require("./routes/victimRoutes");
const ngoRoutes = require("./routes/ngoRoutes");
const adminRoutes = require("./routes/adminRoutes");
const requestRoutes = require("./routes/requestRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");

const app = express();
const PORT = 5001;

// MongoDB Connection URL
const MONGO_URI = "mongodb+srv://reetanmohapatra8280:GxVN3tOLHUkLokZx@cluster0.aonig5j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace 'your_database_name' with your database name

const corsOptions = {
  origin: ['*','https://disaster-relief-coordination-system-frontend.vercel.app'],  // Replace with your frontend URL if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/victims", victimRoutes);
app.use("/api/ngo", ngoRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/emergency", emergencyRoutes);

// MongoDB connection and 2dsphere index creation
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');

  // Ensure 2dsphere index is created on 'location' field in 'Request' collection
  const Request = mongoose.model('Request'); // Import the Request model

  // Create 2dsphere index if not already created
  Request.collection.createIndex({ "location": "2dsphere" }, function(err, result) {
    if (err) {
      console.error("Error creating 2dsphere index:", err);
    } else {
      console.log("2dsphere index created on the 'location' field:", result);
    }
  });
  
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
