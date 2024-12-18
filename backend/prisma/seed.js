import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Add initial users
  await prisma.user.createMany({
    data: [
      {
        name: "Admin User",
        email: "admin@example.com",
        password: "$2b$10$hashedpassword", // Use bcrypt to hash passwords
        role: "Admin",
      },
    ],
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
