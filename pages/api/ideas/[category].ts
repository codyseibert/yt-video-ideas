import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { Category } from "../../../data/ideaCategory";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const category = req.query.category as string;

  if (category === Category.PUBLISHED) {
    const allIdeas = await prisma.idea.findMany({
      where: {
        NOT: {
          videoLink: null,
        },
      },
    });
    res.send(allIdeas);
    return;
  }

  const allIdeas = await prisma.idea.findMany({
    where: {
      category,
    },
  });

  res.send(allIdeas);
};

export default handler;
