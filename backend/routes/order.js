const express = require("express");
const router = express.Router();
const { PrismaClient } = require("../generated/prisma");
const { z } = require("zod");
const { authMiddleware } = require("../middleware");

const prisma = new PrismaClient();

const orderSchema = z.object({
  items: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      quantity: z.number().min(1),
    })
  ),
  totalAmount: z.number().min(1),
  phone: z.string().min(10, "Phone number is required").optional(),
});

router.post("/", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  let userPhone = null;
  if (token) {
    try {
      const decoded = require("jsonwebtoken").verify(
        token,
        process.env.JWT_SECRET
      );
      userPhone = decoded.phone;
      console.log(userPhone);
    } catch (err) {
      // Invalid token → treat as guest
      console.log("Invalid JWT, continuing as guest.");
    }
  }

  try {
    const { items, totalAmount, phone } = orderSchema.parse(req.body);
    let phoneNumber = phone;
    if (userPhone) {
      phoneNumber = userPhone;
    }


    const order = await prisma.order.create({
      data: {
        phone: phoneNumber,
        totalAmount,
        items: {
          create: items,
        },
      },
      include: { items: true },
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    console.error(err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

router.get("/history", authMiddleware, async (req, res) => {
  try {
    const phone = req.phone;

    const orders = await prisma.order.findMany({
      where: { phone },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });

    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch order history" });
  }
});

module.exports = router;
