import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { name, email, posts, profile } = req.body;
    const post = await prisma.user.create({
      data: {
        name: name,
        email: email,
        posts: {
          create: { title: posts },
        },
        profile: {
          create: { bio: profile },
        },
      },
    });
    res.status(200).json(post);
  } else if (req.method === 'GET') {
    const posts = await prisma.user.findMany();
    res.status(200).json(posts);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
