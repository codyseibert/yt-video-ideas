import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const fetchIdeas = async () => {
    const allIdeas = await prisma.idea.findMany();
    res.send(allIdeas);
  };

  fetchIdeas();
}
