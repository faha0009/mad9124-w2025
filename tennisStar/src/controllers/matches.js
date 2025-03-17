const Match = require("../models/Match");

// Create a new match
const createOne = async (req, res) => {
  try {
    const { court, player1, player2, sets, winner } = req.body;

    if (
      !court ||
      !player1 ||
      !player2 ||
      !sets ||
      !winner ||
      !Array.isArray(sets)
    ) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const match = new Match({
      court,
      player1,
      player2,
      sets,
      winner,
    });

    await match.save();

    
    await match.populate("court");

    res.status(201).json({ data: match });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

// Get all 
const getAll = async (_req, res) => {
  try {
    const matches = await Match.find().populate("court");
    res.json({ data: matches });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one match by ID
const getOne = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id).populate("court");

    if (!match) {
      return res.status(404).json({
        error: `Match with id ${req.params.id} not found`,
      });
    }

    res.json({ data: match });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        error: `Match with id ${req.params.id} not found`,
      });
    }
    res.status(500).json({ error: error.message });
  }
};

// Replace a match (PUT)
const replaceOne = async (req, res) => {
  try {
    const { court, player1, player2, sets, winner } = req.body;

    if (
      !court ||
      !player1 ||
      !player2 ||
      !sets ||
      !winner ||
      !Array.isArray(sets)
    ) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

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
    ).populate("court");

    if (!match) {
      return res.status(404).json({
        error: `Match with id ${req.params.id} not found`,
      });
    }

    res.json({ data: match });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    if (error.name === "CastError") {
      return res.status(404).json({
        error: `Match with id ${req.params.id} not found`,
      });
    }
    res.status(500).json({ error: error.message });
  }
};

// Update a match (PATCH)
const updateOne = async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("court");

    if (!match) {
      return res.status(404).json({
        error: `Match with id ${req.params.id} not found`,
      });
    }

    res.json({ data: match });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    if (error.name === "CastError") {
      return res.status(404).json({
        error: `Match with id ${req.params.id} not found`,
      });
    }
    res.status(500).json({ error: error.message });
  }
};

// Delete a match
const deleteOne = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id).populate(
      "court"
    );

    if (!match) {
      return res.status(404).json({
        error: `Match with id ${req.params.id} not found`,
      });
    }

    res.json({ data: match });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        error: `Match with id ${req.params.id} not found`,
      });
    }
    res.status(500).json({ error: error.message });
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
