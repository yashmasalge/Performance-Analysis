import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import Link from 'next/link'

const Home: React.FC = () => {
  const router = useRouter();

  const handleRegisterEmployee = () => {
    router.push('/register');
  };

  const handleViewEmployees = () => {
    router.push('/table');
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen -mt-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Welcome to Performance Analysis</h2>
          <p className="text-lg text-gray-700">Please use the buttons below to manage employees.</p>
        </div>
        <div className="space-x-4">
          <button
            onClick={handleRegisterEmployee}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Register Employee
          </button>
          <button
          onClick={handleViewEmployees}
           className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">
            View Employee
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
