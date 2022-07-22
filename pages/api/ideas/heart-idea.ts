// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).send(
      'you must be logged in to like an idea'
    );
  }

  const authorEmail = session.user?.email!;
  const { ideaId } = req?.body;

  const like = await prisma.like.findFirst({
    where: {
      email: authorEmail,
      ideaId,
    }
  });

  const idea = await prisma.idea.findUnique({
    where: {
      id: ideaId,
    },
  });

  if (!idea) {
    return res.status(404).send(`idea with id of ${ideaId} does not exist`);
  }

  if (like) {
    await prisma.idea.update({
      where: {
        id: ideaId,
      },
      data: {
        voteCount: idea?.voteCount - 1
      },
    });
    await prisma.like.delete({
      where: {
        id: like.id
      }
    })
    return res.send(null);
  } else {
    await prisma.idea.update({
      where: {
        id: ideaId,
      },
      data: {
        voteCount: idea?.voteCount + 1
      },
    });
    const like = await prisma.like.create({
      data: {
        ideaId,
        email: authorEmail
      }
    })
    return res.send(like);
  }

};

export default handler;
