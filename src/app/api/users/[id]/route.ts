import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while retrieving the user.',
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { email, name } = await request.json();
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { email, name },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while updating the user.',
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while deleting the user.',
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
