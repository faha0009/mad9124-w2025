const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courtSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 250,
    },
    count: {
      type: Number,
      required: true,
      min: 1,
      max: 99,
    },
  },
  {
    versionKey: false,
  }
);

const Court = mongoose.model("Court", courtSchema);

module.exports = Court;
