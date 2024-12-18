import { faker } from "@faker-js/faker";

await prisma.user.createMany({
  data: Array.from({ length: 50 }, () => ({
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: "user",
  })),
});
