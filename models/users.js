const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    maxLength: 255,
    minLength: 6,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

UserSchema.methods = {
  comparePass(pass) {
    return bcrypt.compare(pass, this.password);
  },
};

module.exports = model("users", UserSchema);
