const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const daySchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    tier: {
      type: String,
      enum: ["Bronze", "Silver", "Gold"],
    },
    date: {
      type: Number,
    },
    night: {
      type: Number,
    },
    morning: {
      type: Number,
    },
    score: {
      type: Number,
    },
    bgImage: {
      type: String,
    },
  },
  { timestamps: true },
);

const Day = mongoose.model("Day", daySchema);

module.exports = Day;
