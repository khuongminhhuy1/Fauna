// userController.js
import "dotenv/config.js";
import { PrismaClient } from "@prisma/client";
import { comparePassword, hashPassword } from "../utils/passwordHash.js";
import jwt from "jsonwebtoken";
import { validateUserInput } from "../middleware/validation.js";
import { sendEmail } from "../utils/mailer.js";

const prisma = new PrismaClient();

//Create
export async function createUser(req, res) {
  const { name, email, password } = req.body;

  //Validate
  const validationErrors = validateUserInput({ name, email, password });

  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  //Hash Password
  const hashedPassword = await hashPassword(password);
  try {
    let findEmail = await prisma.user.findFirst({
      where: { email: email },
    });
    if (findEmail) {
      return res.status(400).json("This email has already been taken");
    }
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "24h", // Token expires in 24 hours
    });
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        token: { create: { token } },
      },
    });
    const message = `
<p>Hello ${newUser.name},</p>
<p>Please click the link below to verify the account you just created in Fauna Shop</p>
<p><a href="${process.env.APP_URL}/user/verify/${newUser.id}/${token}">Verify Account</a></p>
<p>Thank you and welcome to our website!</p>
`;
    await sendEmail(newUser.email, "Verify Email", message);
    res.status(201).send("An Email sent to your account please verify");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

//Verify
export async function verifyEmail(req, res) {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).send("Invalid user ID");
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(400).send("User not found");
    }
    const token = await prisma.token.findFirst({
      where: {
        userId: userId,
        token: req.params.token,
      },
    });
    if (!token) {
      return res.status(400).send("Invalid or expired token");
    }
    await prisma.user.update({
      where: { id: userId },
      data: { verified: true },
    });

    // Delete the token from the database
    await prisma.token.delete({
      where: {
        id: token.id,
      },
    });
    return res.redirect("http://localhost:5173/verified");
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(400).json({ error: "Invalid or expired token." });
  }
}

//Login
export async function loginUser(req, res) {
  const { email, password, verified } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    if (verified === false) {
      return res.status(400).send({ message: "User hasn't been verified yet" });
    }
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password Incorrect" });
    } else {
      const token = jwt.sign(
        {
          userId: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).send(token);
        }
      );
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

//Get Id User
export async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

//Get All
export async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

//Update User
export async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

//Delete User
export async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).send("User Deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
