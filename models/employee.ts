import mongoose, { Schema, Document } from 'mongoose';

interface LeaveApplication {
  type: 'Planned' | 'Unplanned';
  fromDate: Date;
  toDate: Date;
}

export interface EmployeeDocument extends Document {
  empid: string;
  name: string;
  team: 'Team A' | 'Team B';
  experience: number;
  projectExperience: number;
  leaveApplications: LeaveApplication[];
}

const LeaveApplicationSchema: Schema = new Schema({
  type: {
    type: String,
    enum: ['Planned', 'Unplanned'],
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
});

const EmployeeSchema: Schema = new Schema({
  empid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    enum: ['Team A', 'Team B'],
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  projectExperience: {
    type: Number,
    required: true,
  },
  leaveApplications: {
    type: [LeaveApplicationSchema],
    default: [],
  },
});

export default mongoose.models.Employee || mongoose.model<EmployeeDocument>('Employee', EmployeeSchema);
