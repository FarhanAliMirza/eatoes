const express = require("express");
const router = express.Router();
const { PrismaClient } = require("../generated/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

const prisma = new PrismaClient();

const signupSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(10).max(15),
  password: z.string().min(6),
});

const signinSchema = z.object({
  phone: z.string().min(10).max(15),
  password: z.string().min(6),
});

router.post("/signup", async (req, res) => {
  try {
    const { name, phone, password } = signupSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({ where: { phone } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Phone number already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        phone,
        password: hashedPassword,
      },
    });
    const token = jwt.sign({ phone: phone }, process.env.JWT_SECRET);

    res.status(201).json({ message: "Signup successful", token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { phone, password } = signinSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      return res.status(400).json({ error: "Invalid phone or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid phone or password" });
    }

    const token = jwt.sign({ phone: phone }, process.env.JWT_SECRET);

    res.json({ message: "Signin successful", token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
