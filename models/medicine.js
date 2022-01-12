const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const Chemistries = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  recipe: {
    type: Array,
    trim: true,
    ref: "recipes",
  },
  partner: {
    type: String,
    required: true,
    ref: "partners",
  },
  use: {
    type: String,
  },
  price: {
    type: Number,
  },
  status: {
    type: Boolean,
  },
});

module.exports = model("chemistries", Chemistries);
