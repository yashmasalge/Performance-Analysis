import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Layout from './Layout';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (employee: Employee) => void;
}

interface Employee {
  name: string;
  empid: string;
  team: string;
  experience: number;
  projectExperience: number;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onRegister }) => {
  const [employee, setEmployee] = useState<Employee>({
    name: '',
    empid: '',
    team: 'Team A',
    experience: 0,
    projectExperience: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(employee);
    onClose();
  };

  return (
    <Layout>
    <div className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md mx-4 transform transition-all">
        <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
          <h2 className="text-xl font-semibold">Register Employee</h2>
          <button onClick={onClose}>
            <FaTimes className="text-gray-600" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Employee ID</label>
            <input
              type="text"
              name="empid"
              value={employee.empid}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Team</label>
            <select
              name="team"
              value={employee.team}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="Team A">Team A</option>
              <option value="Team B">Team B</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Total Experience</label>
            <input
              type="number"
              name="experience"
              value={employee.experience}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Experience in Project</label>
            <input
              type="number"
              name="projectExperience"
              value={employee.projectExperience}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
    </Layout>
  );
};

export default RegisterModal;
