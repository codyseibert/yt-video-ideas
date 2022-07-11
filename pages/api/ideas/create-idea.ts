import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data } = req?.body;

  const createIdea = async () => {
    const idea = await prisma.idea.create({
      data: {
        title: data?.title,
        description: data?.description,
      },
    });

    if (!idea) return false;

    return true;
  };

  createIdea();
}
