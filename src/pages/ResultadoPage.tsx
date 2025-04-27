import React from 'react';
import { Link } from 'react-router-dom';

const ResultadoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#9b87f5] p-6 text-white text-center">
            <h1 className="text-3xl font-bold mb-2">Seu Resultado do Quiz</h1>
            <p className="text-lg">Baseado nas suas respostas, identificamos seu perfil como:</p>
          </div>
          
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#432818] mb-2">Perfil Inovador</h2>
              <p className="text-gray-600 mb-6">Você possui uma mente criativa e está sempre em busca de novas ideias e abordagens.</p>
              
              <div className="w-32 h-32 rounded-full bg-[#f9f7ff] border-4 border-[#9b87f5] flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#9b87f5]">92%</span>
              </div>
              <p className="text-sm text-gray-500">Compatibilidade com este perfil</p>
            </div>
            
            <div className="bg-[#f9f7ff] p-6 rounded-lg mb-8">
              <h3 className="text-xl font-bold text-[#432818] mb-4">Oferta Exclusiva para seu Perfil</h3>
              <p className="mb-4">Baseado no seu perfil, preparamos uma oferta especial que vai ajudar você a aproveitar todo seu potencial:</p>
              
              <div className="bg-white p-4 rounded-lg border border-[#9b87f5] mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-bold text-[#432818]">Curso Desbloquear sua Criatividade</h4>
                  <div className="text-[#9b87f5] font-bold">
                    <span className="line-through text-gray-400 text-sm mr-2">R$497</span>
                    R$297
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">Aprenda técnicas comprovadas para liberar todo seu potencial criativo e se destacar em sua carreira.</p>
                
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Acesso vitalício a todas as aulas
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Comunidade exclusiva de suporte
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Certificado reconhecido pelo mercado
                  </li>
                </ul>
                
                <a 
                  href="#" 
                  className="block w-full bg-[#9b87f5] text-white py-3 px-4 rounded-lg text-center font-medium hover:bg-[#8a76e4] transition-colors"
                >
                  Garantir Minha Vaga com Desconto
                </a>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Oferta válida por tempo limitado</p>
                <div className="text-[#432818] font-medium">Vagas restantes: <span className="font-bold">7</span></div>
              </div>
            </div>
            
            <div className="text-center">
              <Link to="/" className="text-[#9b87f5] hover:underline">Voltar para o início</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultadoPage; 