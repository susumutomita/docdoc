import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred while retrieving the users.' },
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
      { message: 'An error occurred while creating the user.' },
      { status: 500 },
    );
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
    return NextResponse.json(
      { message: 'An error occurred while updating the user.' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  try {
    await prisma.user.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: 'User deleted successfully.' },
      { status: 204 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred while deleting the user.' },
      { status: 500 },
    );
  }
}
