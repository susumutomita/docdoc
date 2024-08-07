import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while retrieving the users.',
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const { email, name } = await request.json();
  try {
    const user = await prisma.user.create({
      data: { email, name },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while creating the user.',
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
