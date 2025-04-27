import React from 'react';
import AdminLayout from './AdminLayout';

interface QuizAdminPanelProps {
  // Propriedades podem ser adicionadas conforme necessário
}

const QuizAdminPanel: React.FC<QuizAdminPanelProps> = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-[#432818] mb-6">Editor de Quiz</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-medium text-[#432818] mb-4">Quiz Atual</h2>
          <p className="text-[#8F7A6A]">
            Configure seu quiz utilizando o editor unificado para uma melhor experiência.
          </p>
          <div className="mt-4">
            <a 
              href="/admin/editor-unificado" 
              className="inline-flex items-center px-4 py-2 bg-[#B89B7A] text-white rounded-md hover:bg-[#A38969] transition-colors"
            >
              Abrir Editor Unificado
            </a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-medium text-[#432818] mb-4">Análise de Dados</h2>
          <p className="text-[#8F7A6A]">
            Visualize os dados coletados pelo seu quiz e otimize sua estratégia.
          </p>
          <div className="mt-4">
            <a 
              href="/admin/utm-analytics" 
              className="inline-flex items-center px-4 py-2 border border-[#B89B7A] text-[#B89B7A] rounded-md hover:bg-[#F9F6F3] transition-colors"
            >
              Ver Análises
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default QuizAdminPanel; 