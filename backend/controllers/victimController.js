const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Victim = require("../models/Victim");

// Secret key for JWT
const JWT_SECRET = "your_secret_key"; // Replace with a secure secret key

// Sign-up controller
const signUp = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
  
    // Check if the email already exists
    const existingUser = await Victim.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new victim
    const newVictim = new Victim({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    await newVictim.save();

    res.status(201).send({ message: "Sign-up successful", victim: newVictim });
  } catch (error) {
    res.status(500).send({ message: "Error signing up", error });
    console.log(error)
  }
};

// Sign-in controller
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const victim = await Victim.findOne({ email });
    if (!victim) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, victim.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: victim._id, email: victim.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Sign-in successful", token:token,email:email });
  } catch (error) {
    res.status(500).json({ message: "Error signing in", error });
  }
};

module.exports = { signUp, signIn };
