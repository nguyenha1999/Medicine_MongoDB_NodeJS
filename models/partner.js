const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const PartnerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
  },
  hotline: {
    type: Number,
  },
  product: {
    type: Array,
    ref: "chemistries",
  },
});

module.exports = model("partners", PartnerSchema);
