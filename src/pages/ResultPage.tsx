
import React, { useEffect, useState } from 'react';
import { QuizResult, StyleResult } from '@/types/quiz';
import { styleConfig } from '@/config/styleConfig';

const ResultPage: React.FC = () => {
  const [result, setResult] = useState<QuizResult | null>(null);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const storedResult = localStorage.getItem('quizResult');
    const storedName = localStorage.getItem('userName');
    
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  if (!result || !result.primaryStyle) {
    return (
      <div className="min-h-screen bg-[#fffaf7] flex items-center justify-center text-[#432818]">
        <div className="text-center p-6">
          <h1 className="text-2xl font-bold mb-4">Resultado não encontrado</h1>
          <p className="mb-4">Não foi possível encontrar o resultado do seu quiz.</p>
          <a href="/" className="text-[#B89B7A] hover:underline">Voltar e refazer o quiz</a>
        </div>
      </div>
    );
  }

  const { primaryStyle, secondaryStyles } = result;
  const styleInfo = styleConfig[primaryStyle.category] || {
    image: 'https://via.placeholder.com/400x300',
    description: 'Descrição do estilo não encontrada.',
    guideImage: 'https://via.placeholder.com/400x300'
  };

  return (
    <div className="min-h-screen bg-[#fffaf7]">
      <header className="bg-white py-8 border-b border-[#B89B7A]/20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-[#432818]">
            {userName ? `${userName}, seu Estilo é ${primaryStyle.category}` : `Seu Estilo é ${primaryStyle.category}`}
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1 text-sm">
              <span>Porcentagem de compatibilidade</span>
              <span className="font-medium">{primaryStyle.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#B89B7A] h-2 rounded-full"
                style={{ width: `${primaryStyle.percentage}%` }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="mb-4">{styleInfo.description}</p>
              
              <div className="bg-[#faf7f5] p-4 rounded-lg">
                <h3 className="font-medium mb-2">Seus Estilos Secundários</h3>
                <div className="space-y-3">
                  {secondaryStyles.slice(0, 2).map((style) => (
                    <div key={style.category}>
                      <div className="flex justify-between items-center mb-1 text-xs">
                        <span>{style.category}</span>
                        <span>{style.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-[#B89B7A] h-1.5 rounded-full"
                          style={{ width: `${style.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <img
                src={styleInfo.image}
                alt={`Estilo ${primaryStyle.category}`}
                className="w-full h-auto rounded-lg shadow"
              />
            </div>
          </div>
        </div>

        {/* Seção de Oferta */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#B89B7A]">
            Guia Completo de Estilo + Bônus Exclusivos
          </h2>
          <p className="mb-4">
            Aprenda a aplicar seu estilo pessoal com clareza e autenticidade no seu dia a dia.
          </p>
          <div className="mb-6">
            <img
              src={styleInfo.guideImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp"}
              alt="Guia de Estilo"
              className="w-full max-w-md mx-auto h-auto rounded-lg shadow"
            />
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 mb-6">
            <div className="text-center md:text-right">
              <p className="text-sm text-[#432818]/60 mb-1">Valor Total</p>
              <p className="text-xl line-through text-[#432818]/60">
                R$ 175,00
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-[#B89B7A] mb-1">Oferta especial</p>
              <p className="text-3xl font-bold text-[#B89B7A]">R$ 39,00</p>
            </div>
          </div>

          <button
            onClick={() => window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912'}
            className="w-full max-w-xl mx-auto bg-[#B89B7A] text-white py-3 px-4 rounded-md text-lg font-medium hover:bg-[#A38A69] transition-colors"
          >
            Quero meu Guia + Bônus por R$39,00
          </button>
          <p className="text-sm text-[#B89B7A] mt-4">
            ⏳ Oferta válida apenas nesta página
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#B89B7A]">
            O que está incluído no seu guia
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#faf7f5] p-4 rounded-lg">
              <h3 className="font-medium mb-2">✓ Guia de Estilo Completo</h3>
              <p className="text-sm">
                Um guia personalizado baseado no seu estilo predominante com todas as dicas, estratégias e combinações.
              </p>
            </div>
            <div className="bg-[#faf7f5] p-4 rounded-lg">
              <h3 className="font-medium mb-2">✓ Bônus: Mini Guia de Visagismo</h3>
              <p className="text-sm">
                Aprenda a alinhar seu cabelo, maquiagem e acessórios com sua personalidade visual.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultPage;
