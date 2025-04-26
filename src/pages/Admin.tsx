
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import QuizAdminPanel from '@/components/admin/QuizAdminPanel';

const AdminPage = () => {
  return (
    <AdminLayout>
      <div className="p-6 bg-[#FAF9F7]">
        <h1 className="text-2xl font-playfair text-[#432818] mb-6">Painel do Administrador</h1>
        <QuizAdminPanel />
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
