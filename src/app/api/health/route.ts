import { NextResponse } from 'next/server';

export async function GET() {
  try {
    if (process.env.TEST_ERROR === 'true') {
      throw new Error('Test error');
    }
    return NextResponse.json({ message: "'It works!'" });
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred while health check.' },
      { status: 500 },
    );
  }
}
