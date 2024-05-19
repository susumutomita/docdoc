import { NextResponse } from 'next/server';
import swaggerJson from '@/swagger';

export async function GET() {
  return NextResponse.json(swaggerJson);
}
