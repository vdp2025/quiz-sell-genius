
import React from 'react';

export const VisualEditor: React.FC = () => {
  return (
    <div className="p-6 flex flex-col h-screen">
      <h1 className="text-2xl font-semibold mb-4">Editor Visual</h1>
      <div className="flex-1 bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-4">Editor visual em desenvolvimento</p>
        <p className="text-sm text-gray-400">Estamos trabalhando para implementar um editor visual completo</p>
      </div>
    </div>
  );
};

export default VisualEditor;
