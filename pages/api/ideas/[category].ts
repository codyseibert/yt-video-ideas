// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const category = req.query.category as string;
  const allIdeas = await prisma.idea.findMany({
    where: {
      category,
    },
  });

  res.send(allIdeas);
};

export default handler;
