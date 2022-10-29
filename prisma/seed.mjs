import { PrismaClient } from "@prisma/client";
// const { PrismaClient } = require("@prisma/client");

async function seed() {
  const prisma = new PrismaClient();
  await prisma.post.deleteMany();

  let userExists;
  userExists = await prisma.user.findFirst();
  if (!userExists) {
    userExists = await prisma.user.create({
      data: {
        email: "bob@test.com",
        name: "Bob",
        password: "bob",
      },
    });
  }

  const posts = Array.from({ length: 1000 }, (_, i) => i + 1);
  for (const post of posts) {
    await prisma.post.create({
      data: {
        title: `Post ${post}`,
        body: `This is the body of post number ${post}`,
        author: { connect: { id: userExists.id } },
      },
    });
  }
  prisma.$disconnect();
}

seed();
