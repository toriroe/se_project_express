const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  weather: {
    enum: ["hot", "warm", "cold"],
    // required: true,
  },
  imageUrl: {
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
    required: true,
  },
  owner: {
    // required: true,
  },
  likes: {},
  createdAt: {},
});

module.exports = mongoose.model("clothingItem", clothingItemSchema);
