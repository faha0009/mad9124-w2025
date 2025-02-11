const { Router } = require("express");
const validateUserData = require("../middleware/validateUserData");

const userRouter = Router();

// In-memory database
const users = [];

// GET all users
userRouter.get("/", (req, res) => {
  res.json(users);
});

// POST new user
userRouter.post("/", validateUserData, (req, res) => {
  const { name, email } = req.body;

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = userRouter;
