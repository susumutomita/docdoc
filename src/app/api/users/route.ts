import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, posts, profile } = await req.json();
    const user = await prisma.user.create({
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
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred while creating the user.' },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred while retrieving the users.' },
      { status: 500 },
    );
  }
}
