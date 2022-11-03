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

  let postCateforyExists;
  postCateforyExists = await prisma.postCategory.findFirst();
  if (!postCateforyExists) {
    postCateforyExists = await prisma.postCategory.create({
      data: { name: "General" },
    });
    await prisma.postCategory.create({
      data: { name: "Food" },
    });
    await prisma.postCategory.create({
      data: { name: "Sport" },
    });
    await prisma.postCategory.create({
      data: { name: "Decoration" },
    });
  }

  const posts = Array.from({ length: 1000 }, (_, i) => i + 1);
  for (const post of posts) {
    await prisma.post.create({
      data: {
        title: `Post ${post}`,
        date: new Date(),
        published: true,
        category: { connect: { id: postCateforyExists.id } },
        body: `This is the body of post number ${post}`,
        author: { connect: { id: userExists.id } },
      },
    });
  }
  prisma.$disconnect();
}

seed();
