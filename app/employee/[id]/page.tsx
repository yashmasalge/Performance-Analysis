'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import Layout from '@/components/Layout';
import 'chart.js/auto';

interface Leave {
  type: string;
  fromDate: string;
  toDate: string;
}

interface Employee {
  _id: string;
  name: string;
  empid: string;
  team: string;
  experience: number;
  projectExperience: number;
  leaveApplications: Leave[];
}

const EmployeePage = ({ params }: { params: { id: string } }) => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const res = await fetch(`/api/employeeApi/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setEmployee(data.employee);
      } else {
        console.error('Failed to fetch employee data:', res.status);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const prepareChartData = () => {
    if (!employee) {
      return {
        labels: [],
        datasets: [],
      };
    }

    const leaveDates: { [key: string]: { planned: number; unplanned: number } } = {};

    employee.leaveApplications.forEach((leave) => {
      const fromDate = formatDate(leave.fromDate);
      const toDate = formatDate(leave.toDate);

      if (!leaveDates[fromDate]) {
        leaveDates[fromDate] = { planned: 0, unplanned: 0 };
      }
      if (!leaveDates[toDate]) {
        leaveDates[toDate] = { planned: 0, unplanned: 0 };
      }

      if (leave.type === 'Planned') {
        leaveDates[fromDate].planned += 1;
        leaveDates[toDate].planned += 1;
      } else {
        leaveDates[fromDate].unplanned += 1;
        leaveDates[toDate].unplanned += 1;
      }
    });

    const labels = Object.keys(leaveDates).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const plannedData = labels.map((date) => leaveDates[date].planned);
    const unplannedData = labels.map((date) => leaveDates[date].unplanned);

    return {
      labels,
      datasets: [
        {
          label: 'Planned Leave',
          data: plannedData,
          borderColor: '#4caf50',
          backgroundColor: '#4caf50',
          fill: false,
        },
        {
          label: 'Unplanned Leave',
          data: unplannedData,
          borderColor: '#f44336',
          backgroundColor: '#f44336',
          fill: false,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,  // Ensures that x-axis starts at zero if there are zero leaves
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,  // Ensures that y-axis starts at zero
        min: 0,            // Set minimum value for y-axis to 0
        max: 4,           // Set maximum value for y-axis to 10
        grid: {
          borderColor: '#ddd',
          borderWidth: 1,
          drawBorder: true,
          drawOnChartArea: true,
          drawTicks: true,
        },
      },
    },
  };

  return (
    <Layout>
    <div className="p-4">
      {employee ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{employee.name}'s Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-bold mb-2">Employee Details</h2>
              <p><strong>Employee ID:</strong> {employee.empid}</p>
              <p><strong>Team:</strong> {employee.team}</p>
              <p><strong>Experience:</strong> {employee.experience} years</p>
              <p><strong>Project Experience:</strong> {employee.projectExperience} years</p>
              <h3 className="text-lg font-bold mt-4">Leave Applications</h3>
              <ul>
                {employee.leaveApplications.map((leave, index) => (
                  <li key={index} className="mb-2">
                    <strong>{leave.type} Leave:</strong> {formatDate(leave.fromDate)} - {formatDate(leave.toDate)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-bold mb-2">Leave Trends</h2>
              <Line data={prepareChartData()} options={chartOptions} />
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </Layout>
  );
};

export default EmployeePage;
