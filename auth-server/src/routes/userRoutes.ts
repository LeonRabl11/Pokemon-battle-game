import express from "express";
import { User } from "../models/user.model.ts";
import { authGuard, type AuthedRequest }from "../middlewares/authGuard.ts";

const router = express.Router();

// update xp
router.patch("/xp", authGuard, async (req: AuthedRequest, res) => {
  const { amount } = req.body;
  const userId = req.user!.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.xp = Math.max(0, user.xp + amount); 
    await user.save();

    res.json({ xp: user.xp });
  } catch (err) {
    res.status(500).json({ message: "Error updating XP" });
  }
});

// Leaderboard
router.get("/leaderboard", async (req, res) => {
  const users = await User.find().select("email xp -_id").sort({ xp: -1 });
  res.json(users);
});

export default router;
