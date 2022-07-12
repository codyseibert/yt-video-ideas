import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return prisma.idea
    .findMany()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(405).end();
    });
}
