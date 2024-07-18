import React, { useState, useEffect } from 'react';
import { useTable, Column } from 'react-table';
import { useRouter } from 'next/navigation';
import LeaveModal from './LeaveModal';

interface Employee {
  _id: string;
  name: string;
  empid: string;
  team: string;
  experience: number;
  projectExperience: number;
}

const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch('/api/employeeApi');
      if (res.ok) {
        const data = await res.json();
        console.log('Fetched Employees:', data); // Log the fetched data
        setEmployees(data.employees || []);
      } else {
        console.error('Failed to fetch employees:', res.status);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const columns: Column<Employee>[] = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Employee ID',
        accessor: 'empid',
      },
      {
        Header: 'Team',
        accessor: 'team',
      },
      {
        Header: 'Experience',
        accessor: 'experience',
      },
      {
        Header: 'Project Experience',
        accessor: 'projectExperience',
      },
      {
        Header: 'Actions',
        accessor: '_id',
        Cell: ({ row }: { row: { original: Employee } }) => (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
            onClick={(e) => handleApplyLeave(e, row.original)}
          >
            Apply Leave
          </button>
        ),
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: employees, // Use employees state as data source
  });

  const handleRowClick = (id: string) => {
    console.log(id);
    router.push(`/employee/${id}`);
  };

  const handleApplyLeave = (e: React.MouseEvent, employee: Employee) => {
    e.stopPropagation();
    setSelectedEmployee(employee);
    setIsLeaveModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLeaveModalOpen(false);
  };

  const handleApplyLeaveSubmit = async (leaveData: { type: string, fromDate: string, toDate: string }) => {
    if (selectedEmployee) {
      try {
        const res = await fetch(`/api/employeeApi/${selectedEmployee._id}/leave`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(leaveData),
        });

        if (res.ok) {
          alert('Leave applied successfully');
          fetchEmployees();
        } else {
          alert('Failed to apply leave');
        }
      } catch (error) {
        console.error('Error applying leave:', error);
      }
      handleCloseModal();
    }
  };

  return (
    <div className="overflow-x-auto">
      <table
        {...getTableProps()}
        className="min-w-full bg-white shadow-md rounded-lg overflow-hidden"
      >
        <thead className="bg-gray-50">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                  key={column.id}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="divide-y divide-gray-200"
        >
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="cursor-pointer hover:bg-gray-100 transition duration-150"
                onClick={() => handleRowClick(row.original._id)}
                key={row.id}  // Ensure each row has a unique key
              >
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b"
                    key={cell.column.id}  // Ensure each cell has a unique key
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {selectedEmployee && (
        <LeaveModal
          isOpen={isLeaveModalOpen}
          onClose={handleCloseModal}
          employee={selectedEmployee}
          onSubmit={handleApplyLeaveSubmit}
        />
      )}
    </div>
  );
};

export default EmployeeTable;
