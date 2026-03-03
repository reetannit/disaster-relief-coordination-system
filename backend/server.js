const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const victimRoutes = require("./routes/victimRoutes");
const ngoRoutes = require("./routes/ngoRoutes");
const adminRoutes = require("./routes/adminRoutes");
const requestRoutes = require("./routes/requestRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");

const app = express();

// MongoDB Connection URL
const MONGO_URI = process.env.MONGODB_URI || "mongodb+srv://reetanmohapatra8280:GxVN3tOLHUkLokZx@cluster0.aonig5j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const corsOptions = {
  origin: [
    'https://disaster-relief-coordination-system-frontend.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Cached MongoDB connection for serverless
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log('MongoDB connected');

    // Ensure 2dsphere index (non-fatal if it fails)
    try {
      const Request = require("./models/Request");
      await Request.collection.createIndex({ "location": "2dsphere" });
    } catch (indexErr) {
      console.error("Index creation error (non-fatal):", indexErr.message);
    }
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

// Connect to MongoDB BEFORE handling any route
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Routes (AFTER DB connection middleware)
app.use("/api/victims", victimRoutes);
app.use("/api/ngo", ngoRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/emergency", emergencyRoutes);

// Export for Vercel serverless
module.exports = app;
