import { PrismaClient } from "@prisma/client";
// const { PrismaClient } = require("@prisma/client");

async function seed() {
  const prisma = new PrismaClient();

  let userExists;
  userExists = await prisma.user.findFirst();
  if (!userExists) {
     await prisma.user.create({
      data: {
        username: "admin",
        password: "Pa$$w0rd",
      },
    });
    await prisma.user.create({
        data: {
          username: "user",
          password: "asd123!",
        },
      });
      await prisma.user.create({
        data: {
          username: "moderator",
          password: "zxc123!",
        },
      });
  }

  prisma.$disconnect();
}

seed();
