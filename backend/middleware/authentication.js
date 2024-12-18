import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    res.status(403).json({ message: "Forbidden" });
  }
};

export const authorizeRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role))
    return res.status(403).json({ message: "Access denied" });
  next();
};
