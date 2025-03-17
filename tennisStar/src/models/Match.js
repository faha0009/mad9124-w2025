const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchSchema = new Schema(
  {
    court: {
      type: Schema.Types.ObjectId,
      ref: "Court",
      required: true,
    },
    player1: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 64,
    },
    player2: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 64,
    },
    sets: {
      type: [[Number]], 
      required: true,
      validate: {
        validator: function (sets) {
          return sets.length >= 3 && sets.length <= 5;
        },
        message: "Sets must contain at least 3 and at most 5 sets",
      },
    },
    winner: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 64,
    },
  },
  {
    versionKey: false,
  }
);

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
