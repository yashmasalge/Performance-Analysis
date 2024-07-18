import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongoDB';
import Employee from '@/models/employee';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { type, fromDate, toDate } = await req.json();

  await connectMongoDB();
  const employee = await Employee.findByIdAndUpdate(
    id,
    { $push: { leaveApplications: { type, fromDate, toDate } } },
    { new: true }
  );

  return NextResponse.json({ employee }, { status: 200 });
}
