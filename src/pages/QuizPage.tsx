import React from 'react';
import { Link } from 'react-router-dom';

const QuizPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F7] flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-[#432818] mb-8">Quiz de Personalidade</h1>
        
        <div className="space-y-6">
          <div className="bg-[#f9f7ff] p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Descubra seu perfil único!</h2>
            <p className="mb-4">Responda algumas perguntas rápidas para descobrir qual é o seu tipo de personalidade e receber recomendações personalizadas.</p>
            <Link 
              to="/resultado" 
              className="block w-full bg-[#9b87f5] text-white py-3 px-4 rounded-lg text-center font-medium hover:bg-[#8a76e4] transition-colors"
            >
              Começar Quiz
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-[#f5f5f5] p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-[#9b87f5] mb-1">2 min</div>
              <div className="text-sm text-gray-600">Tempo para completar</div>
            </div>
            
            <div className="bg-[#f5f5f5] p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-[#9b87f5] mb-1">5</div>
              <div className="text-sm text-gray-600">Perguntas rápidas</div>
            </div>
            
            <div className="bg-[#f5f5f5] p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-[#9b87f5] mb-1">100%</div>
              <div className="text-sm text-gray-600">Personalizado</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage; 