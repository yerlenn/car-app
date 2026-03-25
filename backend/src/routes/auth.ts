import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { readJSON, writeJSON } from "../data/store";
import { User } from "../types";
import { generateToken } from "../middleware/auth";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password, name, role } = req.body;

    if (!username || !password || !name || !role) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    if (!["buyer", "seller"].includes(role)) {
      res.status(400).json({ error: "Role must be buyer or seller" });
      return;
    }

    const users = readJSON<User>("users.json");
    const existing = users.find((u) => u.username === username);

    if (existing) {
      res.status(409).json({ error: "Username already taken" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: uuidv4(),
      username,
      password: hashedPassword,
      name,
      role,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeJSON("users.json", users);

    const token = generateToken({
      userId: newUser.id,
      username: newUser.username,
      role: newUser.role,
    });

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        name: newUser.name,
        role: newUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }

    const users = readJSON<User>("users.json");
    const user = users.find((u) => u.username === username);

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = generateToken({
      userId: user.id,
      username: user.username,
      role: user.role,
    });

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
