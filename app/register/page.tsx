'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegisterModal from '@/components/EmployeeRegister';

const Register: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const router = useRouter();
  
    const handleRegister = async (employee: any) => {
      try {
        const res = await fetch('/api/employeeApi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employee),
        });
  
        if (res.ok) {
          const savedEmployee = await res.json();
          console.log('Registered Employee:', savedEmployee);
          router.push('/');
        } else {
          alert('Failed to register employee');
        }
      } catch (error) {
        console.error('Error registering employee:', error);
        alert('Failed to register employee');
      }
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
      router.push('/');
    };
  
    return (
      <div className="flex flex-col items-center justify-center h-screen -mt-16">
        <RegisterModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onRegister={handleRegister}
        />
      </div>
    );
  };

export default Register;
