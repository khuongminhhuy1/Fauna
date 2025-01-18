import "dotenv/config";
import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    res.status(403).json({ message: "Forbidden" });
  }
};
export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request
    if (req.user.role === "Admin") {
      next();
    }
  } catch (error) {
    res.status(403).json({ message: "Forbidden" });
  }
};

export const authorizeRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role))
    return res.status(403).json({ message: "Access denied" });
  next();
};
