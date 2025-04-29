const mongoose = require("mongoose");
const dotenv = require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, default: "" },
  isAvailable: { type: Boolean, default: true },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItem;
