import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="p-4 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Performance Analysis</h1>
          <div className="space-x-4">
            {/* <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Register Employee
            </button>
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              View Employee
            </button> */}
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
