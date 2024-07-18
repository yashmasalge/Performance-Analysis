'use client'
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import EmployeeTable from '@/components/EmployeeTable';

const Employees: React.FC = () => {
   
  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Employee List</h1>
        <EmployeeTable  />
      </div>
    </Layout>
  );
};

export default Employees;
