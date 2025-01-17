import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Save user information
export async function saveUserInformation(req, res) {
  const { userId, address, city, state, zipCode, phone, country } = req.body;

  if (
    !userId ||
    !address ||
    !city ||
    !state ||
    !zipCode ||
    !phone ||
    !country
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Upsert user information
    const userInfo = await prisma.userInformation.upsert({
      where: { userId: Number(userId) },
      create: {
        userId: Number(userId),
        address,
        city,
        state,
        zipCode,
        phone,
        country,
      },
      update: {
        address,
        city,
        state,
        zipCode,
        phone,
        country,
      },
    });

    res
      .status(200)
      .json({ message: "User information saved successfully", userInfo });
  } catch (error) {
    console.error("Error saving user information:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getUserInformation(userId) {
  return await prisma.userInformation.findUnique({
    where: { userId },
  });
}
