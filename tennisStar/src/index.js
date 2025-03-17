const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Import routers
const matchRouter = require("./routers/matches");
const courtRouter = require("./routers/courts");

// Initialize Express app
const app = express();
app.use(express.json());

// Mount routers
app.use("/api/matches", matchRouter);
app.use("/api/courts", courtRouter);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Server listening on port ${PORT}`);
});
