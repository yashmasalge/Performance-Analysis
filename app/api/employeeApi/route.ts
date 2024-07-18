import connectMongoDB from "@/libs/mongoDB";
import Employee from "@/models/employee";
import { NextRequest, NextResponse } from "next/server";

// POST: Create a new employee
export async function POST(request: NextRequest) {
  const { empid, name, team, experience, projectExperience } = await request.json();
  await connectMongoDB();
  await Employee.create({ empid, name, team, experience, projectExperience });
  return NextResponse.json({ message: "Employee Created" }, { status: 201 });
}

// GET: Retrieve all employees
export async function GET() {
  await connectMongoDB();
  const employees = await Employee.find();
  return NextResponse.json({ employees });
}

// DELETE: Remove an employee by ID
export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return NextResponse.json({ message: "Employee not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Employee deleted" }, { status: 200 });
  }
