import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json(
        {
          message: 'An error occurred while retrieving the users.',
          error: error.message,
        },
        { status: 500 },
      );
    } else {
      console.error('Unknown error', error);
      return NextResponse.json(
        {
          message: 'An unknown error occurred while retrieving the users.',
        },
        { status: 500 },
      );
    }
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
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json(
        {
          message: 'An error occurred while creating the user.',
          error: error.message,
        },
        { status: 500 },
      );
    } else {
      console.error('Unknown error', error);
      return NextResponse.json(
        {
          message: 'An unknown error occurred while creating the user.',
        },
        { status: 500 },
      );
    }
  }
}

export async function PUT(request: Request) {
  const { id, email, name } = await request.json();
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { email, name },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json(
        {
          message: 'An error occurred while updating the user.',
          error: error.message,
        },
        { status: 500 },
      );
    } else {
      console.error('Unknown error', error);
      return NextResponse.json(
        {
          message: 'An unknown error occurred while updating the user.',
        },
        { status: 500 },
      );
    }
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  try {
    await prisma.user.delete({
      where: { id },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json(
        {
          message: 'An error occurred while deleting the user.',
          error: error.message,
        },
        { status: 500 },
      );
    } else {
      console.error('Unknown error', error);
      return NextResponse.json(
        {
          message: 'An unknown error occurred while deleting the user.',
        },
        { status: 500 },
      );
    }
  }
}
