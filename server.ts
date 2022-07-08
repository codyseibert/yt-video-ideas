import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const talkToDatabase = async () => {
  prisma.user
    .create({
      data: {
        email: "francisca@gmail.com",
        password: "testpassword",
      },
    })
    .then(() => {
      console.log("created");
    });
  //   prisma.todo
  //     .create({
  //       data: {
  //         title: "Learn Prisma With Next Authentication",
  //         user_id: 2,
  //       },
  //     })
  //     .then(() => {
  //       console.log("created the todo");
  //     });
};

talkToDatabase();
