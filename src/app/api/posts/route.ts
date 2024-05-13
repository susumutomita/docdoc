import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient({ log: ['query'] });

export async function POST(req: Request) {
  try {
    const { title, content, authorId } = await req.json();
    const post = await prisma.post.create({
      data: { title, content, authorId },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred while creating the post.' },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred while retrieving the posts.' },
      { status: 500 },
    );
  }
}
