
import React from 'react';

export const UnifiedEditor: React.FC = () => {
  return (
    <div className="h-screen bg-[#FAF9F7] flex flex-col">
      <header className="bg-white border-b border-gray-200 py-3 px-6">
        <h1 className="text-xl font-semibold text-[#432818]">Editor Unificado</h1>
      </header>
      
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-[#432818]">Modo de Desenvolvimento</h2>
            <p className="text-gray-600">
              Este editor permite criar e personalizar todas as partes do seu quiz em uma interface unificada.
            </p>
            <div className="py-8 text-gray-500">
              <p>Recurso em desenvolvimento.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
