// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, description, authorImage, authorName } = req?.body;

  const createdIdea = await prisma.idea.create({
    data: {
      title,
      description,
      authorImage,
      authorName,
    },
  });

  res.send(createdIdea);
};

export default handler;
