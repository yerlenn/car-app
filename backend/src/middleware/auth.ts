import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthPayload } from "../types";

const JWT_SECRET = process.env.JWT_SECRET || "car-app-secret-key-dev";

export function generateToken(payload: AuthPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
