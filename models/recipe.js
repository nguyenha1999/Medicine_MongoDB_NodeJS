const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const RecipeSchema = new Schema({
  chemistry: {
    type: String,
    required: true,
    ref: "chemistries",
  },
  ratio: {
    type: Number,
    required: true,
  },
});

module.exports = model("recipes", RecipeSchema);
