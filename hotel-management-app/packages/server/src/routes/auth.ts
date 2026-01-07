import { Router } from "express";
import bcrypt from "bcryptjs";

import User from "../models/user.model";
import connectDB from "../lib/db";

const router = Router();

router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  await connectDB();

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return res.json({ message: "Account Created" });
});

export default router;