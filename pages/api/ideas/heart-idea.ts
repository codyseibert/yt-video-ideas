// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { authorName, authorEmail, ideaId } = req?.body;

  const heartedId = await prisma.idea.update({
    where: {
      id: ideaId,
    },
    data: {
      // likes: [],
    },
  });

  console.log(heartedId);

  const createdIdea = await prisma.likes.create({
    data: {
      name: authorName,
      email: authorEmail,
      ideaId,
    },
  });

  res.send(createdIdea);
};

export default handler;
