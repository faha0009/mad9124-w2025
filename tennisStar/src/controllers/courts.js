const Court = require("../models/Court");

// Create a new court
const createOne = async (req, res) => {
  try {
    if (!req.body.name || !req.body.count) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const court = new Court(req.body);
    await court.save();
    res.status(201).json({ data: court });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

// Get all courts
const getAll = async (_req, res) => {
  try {
    const courts = await Court.find();
    res.json({ data: courts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one court by ID
const getOne = async (req, res) => {
  try {
    const court = await Court.findById(req.params.id);
    if (!court) {
      return res.status(404).json({
        error: `Court with id ${req.params.id} not found`,
      });
    }
    res.json({ data: court });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        error: `Court with id ${req.params.id} not found`,
      });
    }
    res.status(500).json({ error: error.message });
  }
};

// Replace a court (PUT)
const replaceOne = async (req, res) => {
  try {
    if (!req.body.name || !req.body.count) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const court = await Court.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!court) {
      return res.status(404).json({
        error: `Court with id ${req.params.id} not found`,
      });
    }

    res.json({ data: court });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    if (error.name === "CastError") {
      return res.status(404).json({
        error: `Court with id ${req.params.id} not found`,
      });
    }
    res.status(500).json({ error: error.message });
  }
};

// Update a court (PATCH)
const updateOne = async (req, res) => {
  try {
    const court = await Court.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!court) {
      return res.status(404).json({
        error: `Court with id ${req.params.id} not found`,
      });
    }

    res.json({ data: court });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    if (error.name === "CastError") {
      return res.status(404).json({
        error: `Court with id ${req.params.id} not found`,
      });
    }
    res.status(500).json({ error: error.message });
  }
};

// Delete a court
const deleteOne = async (req, res) => {
  try {
    const court = await Court.findByIdAndDelete(req.params.id);

    if (!court) {
      return res.status(404).json({
        error: `Court with id ${req.params.id} not found`,
      });
    }

    res.json({ data: court });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        error: `Court with id ${req.params.id} not found`,
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
