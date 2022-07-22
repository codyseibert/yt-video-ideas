// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Like, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  let likes: Like[] = [];
  if (session?.user?.email) {
    likes = await prisma.like.findMany({
      where: {
        email: session.user.email
      }
    })
  }

  res.send(likes);
};

export default handler;
