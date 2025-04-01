require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./src/models/User");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    try {
      const secondUser = new User({
        name: "Second User",
        googleId: "another-google-id-456",
      });

      await secondUser.save();

      const token = jwt.sign(
        { sub: secondUser._id },
        process.env.JWT_SECRET || "your_jwt_secret",
        { expiresIn: "7d" }
      );

      console.log("Second user created:", secondUser);
      console.log("Second JWT Token:", token);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB");
    }
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB:", err);
  });
