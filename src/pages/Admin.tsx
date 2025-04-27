
import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';

const AdminPage = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Painel de Administração</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/admin/quiz-builder" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <h2 className="text-xl font-medium">Construtor de Quiz</h2>
            <p className="text-gray-600 mt-2">Criar e editar quizzes</p>
          </Link>
          <Link to="/admin/editor-resultado" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <h2 className="text-xl font-medium">Editor de Resultado</h2>
            <p className="text-gray-600 mt-2">Personalizar páginas de resultado</p>
          </Link>
          <Link to="/admin/utm-analytics" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <h2 className="text-xl font-medium">UTM Analytics</h2>
            <p className="text-gray-600 mt-2">Análise de UTM parameters</p>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
