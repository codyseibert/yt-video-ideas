import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ideaId, videoLink } = req?.body;

  const updateUserIdea = await prisma.idea.update({
    where: { id: ideaId },
    data: {
      videoLink,
    },
  });

  res.send(updateUserIdea);
};

export default handler;
