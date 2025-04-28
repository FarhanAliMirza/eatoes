const express = require("express");
const router = express.Router();
const MenuItem = require("../menuItems");
const z = require("zod");

const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(), // Optional short description
  price: z.number().positive("Price must be positive"),
  category: z.enum(["Appetizer", "Main Course", "Dessert", "Drink"]),
  imageUrl: z.string().url().optional(), // Optional image link
  isAvailable: z.boolean().default(true), // By default, available
});

router.post("/", async (req, res) => {
  const menuItem = menuItemSchema.parse(req.body);
  const newMenuItem = new MenuItem(menuItem);
  try {
    const savedMenuItem = await newMenuItem.save();
    res.json(savedMenuItem);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
