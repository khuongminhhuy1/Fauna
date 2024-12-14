import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401); // If no token is present

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) return res.sendStatus(403); // Token not valid

    try {
      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) return res.sendStatus(404);

      req.user = user;

      // Check if user is admin
      if (user.role) {
        req.role = "Admin";
        res.redirect("/admin/dashboard");
      } else {
        req.role = "Costumer";
        res.redirect("/");
      }

      next();
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  });
};