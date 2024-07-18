import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongoDB';
import Employee from '@/models/employee';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  await connectMongoDB();
  const employee = await Employee.findById(id);

  return NextResponse.json({ employee }, { status: 200 });
}
