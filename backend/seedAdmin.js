const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

const MONGO_URI =
    process.env.MONGODB_URI ||
    "mongodb+srv://reetan:reetan@cluster0.ugslpdv.mongodb.net/";

async function seedAdmin() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");

        // Delete all existing admins (removes the plain-text password ones)
        await Admin.deleteMany({});
        console.log("Cleared existing admin documents");

        // ======== CHANGE THESE VALUES TO YOUR DESIRED ADMIN CREDENTIALS ========
        const name = "Admin";
        const email = "admin@gmail.com";
        const password = "admin123";
        // =======================================================================

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({
            name,
            email,
            password: hashedPassword,
        });

        await admin.save();
        console.log("Admin seeded successfully!");
        console.log(`  Email: ${email}`);
        console.log(`  Password: ${password}`);

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
}

seedAdmin();
