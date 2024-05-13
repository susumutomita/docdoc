import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({ message: "'It, works!'" });
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred while health check.' },
      { status: 500 },
    );
  }
}
