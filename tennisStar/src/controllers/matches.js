const Match = require("../models/Match");
const User = require("../models/User");

// Create a new match
const createOne = async (req, res) => {
  try {
    const { court, player2, sets, winner } = req.body;

    if (!court || !player2 || !sets || !winner) {
      return res.status(400).json({
        error: "Missing required fields..",
      });
    }

    // Set player1 as the authenticated user
    const player1 = req.user._id;

    const match = new Match({
      court,
      player1,
      player2,
      sets,
      winner,
    });

    await match.save();

    // Populate court and user fields before sending response
    await match.populate([
      { path: "court" },
      { path: "player1", select: "_id name" },
      { path: "player2", select: "_id name" },
      { path: "winner", select: "_id name" },
    ]);

    res.status(201).json({ data: match });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message + ".." });
    }
    res.status(500).json({ error: error.message + ".." });
  }
};

// Get all matches
const getAll = async (_req, res) => {
  try {
    const matches = await Match.find()
      .populate("court")
      .populate("player1", "_id name")
      .populate("player2", "_id name")
      .populate("winner", "_id name");

    res.json({ data: matches });
  } catch (error) {
    res.status(500).json({ error: error.message + ".." });
  }
};

// Get one match by ID
const getOne = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate("court")
      .populate("player1", "_id name")
      .populate("player2", "_id name")
      .populate("winner", "_id name");

    if (!match) {
      return res.status(404).json({
        error: `Match with id ${req.params.id} not found..`,
      });
    }

    res.json({ data: match });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        error: `Match with id ${req.params.id} not found..`,
      });
    }
    res.status(500).json({ error: error.message + ".." });
  }
};

// Replace a match entirely (PUT)
const replaceOne = async (req, res) => {
  try {
    const { court, player2, sets, winner } = req.body;

    if (!court || !player2 || !sets || !winner) {
      return res.status(400).json({
        error: "Missing required fields..",
      });
    }

    // Keep player1 as the authenticated user
    const player1 = req.user._id;

    const match = await Match.findByIdAndUpdate(
      req.params.id,
      {
        court,
        player1,
        player2,
        sets,
        winner,
      },
      { new: true, runValidators: true }
    )
      .populate("court")
      .populate("player1", "_id name")
      .populate("player2", "_id name")
      .populate("winner", "_id name");

    if (!match) {
      return res.status(404).json({
        error: `Match with id ${req.params.id} not found..`,
      });
    }

    res.json({ data: match });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message + ".." });
    }
    if (error.name === "CastError") {
      return res.status(404).json({
        error: `Match with id ${req.params.id} not found..`,
      });
    }
    res.status(500).json({ error: error.message + ".." });
  }
};

// Update a match partially (PATCH)
const updateOne = async (req, res) => {
  try {
    // Don't allow changing player1
    if (req.body.player1) {
      delete req.body.player1;
    }

    const match = await Match.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("court")
      .populate("player1", "_id name")
      .populate("player2", "_id name")
      .populate("winner", "_id name");

    if (!match) {
      return res.status(404).json({
        error: `Match with id ${req.params.id} not found..`,
      });
    }

    res.json({ data: match });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message + ".." });
    }
    if (error.name === "CastError") {
      return res.status(404).json({
        error: `Match with id ${req.params.id} not found..`,
      });
    }
    res.status(500).json({ error: error.message + ".." });
  }
};

// Delete a match
const deleteOne = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id)
      .populate("court")
      .populate("player1", "_id name")
      .populate("player2", "_id name")
      .populate("winner", "_id name");

    if (!match) {
      return res.status(404).json({
        error: `Match with id ${req.params.id} not found..`,
      });
    }

    res.json({ data: match });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        error: `Match with id ${req.params.id} not found..`,
      });
    }
    res.status(500).json({ error: error.message + ".." });
  }
};

module.exports = {
  createOne,
  getAll,
  getOne,
  replaceOne,
  updateOne,
  deleteOne,
};
