require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./src/models/User");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    try {
      // Create a test user
      const testUser = new User({
        name: "Test User",
        googleId: "test-google-id-123",
      });

      await testUser.save();

      // Generate a JWT token
      const token = jwt.sign(
        { sub: testUser._id },
        process.env.JWT_SECRET || "your_jwt_secret",
        { expiresIn: "7d" }
      );

      console.log("Test user created:", testUser);
      console.log("JWT Token:", token);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Disconnect from MongoDB
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB");
    }
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB:", err);
  });
