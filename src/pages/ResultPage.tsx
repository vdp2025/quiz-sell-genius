import React, { useEffect, useState } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import { styleConfig } from '@/config/styleConfig';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
import ErrorState from '@/components/result/ErrorState';
import MotivationSection from '@/components/result/MotivationSection';
import MentorSection from '@/components/result/MentorSection';
import GuaranteeSection from '@/components/result/GuaranteeSection';
import ProductShowcase from '@/components/quiz-result/sales/ProductShowcase';
import BenefitList from '@/components/quiz-result/sales/BenefitList';
import Testimonials from '@/components/quiz-result/sales/Testimonials';
import { StyleResult } from '@/types/quiz';

// Dados de fallback caso não haja resultados disponíveis
const DEFAULT_STYLE: StyleResult = {
  category: 'Contemporâneo',
  title: 'Estilo Contemporâneo',
  description: 'O estilo Contemporâneo é caracterizado por uma abordagem moderna e versátil ao se vestir. Você valoriza peças atuais, mas sem exageros ou modismos passageiros.',
  imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp',
  characteristics: ['Moderno', 'Versátil', 'Atemporal']
};

const ResultPage: React.FC = () => {
  const [loadingState, setLoadingState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const { quizResult } = useQuiz();
  const { globalStyles } = useGlobalStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Verificar se há resultados do quiz no localStorage ou em memória
    try {
      const storedResult = localStorage.getItem('quizResult');
      
      if (quizResult || storedResult) {
        console.log("Quiz result loaded:", quizResult || JSON.parse(storedResult || '{}'));
        setLoadingState('loaded');
      } else {
        console.log("No quiz result found");
        setLoadingState('error');
      }
    } catch (error) {
      console.error("Error loading quiz result:", error);
      setLoadingState('error');
    }
  }, [quizResult]);

  // Mostra estado de carregamento
  if (loadingState === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffaf7]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#B89B7A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#432818]">Carregando seu resultado...</p>
        </div>
      </div>
    );
  }

  // Mostra estado de erro se não houver resultados
  if (loadingState === 'error') {
    return <ErrorState />;
  }

  // Usa dados do quizResult ou valores padrão
  const primaryStyle = quizResult?.primaryStyle || DEFAULT_STYLE;
  
  const secondaryStyles = quizResult?.secondaryStyles || [];
  const category = primaryStyle.category;

  // Usa dados de estilo da configuração ou valores padrão
  const styleData = styleConfig[category] || {
    image: primaryStyle.imageUrl || DEFAULT_STYLE.imageUrl,
    guideImage: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp",
    description: primaryStyle.description || DEFAULT_STYLE.description
  };

  // Calcular percentuais para exibição
  const stylePercentage = 80; // Valor padrão se não existir

  return (
    <div
      className="min-h-screen bg-[#fffaf7]"
      style={{
        backgroundColor: globalStyles?.backgroundColor || '#fffaf7',
        color: globalStyles?.textColor || '#432818',
        fontFamily: globalStyles?.fontFamily || 'inherit',
      }}
    >
      <Header
        primaryStyle={primaryStyle}
        logoHeight={globalStyles?.logoHeight}
        logo={globalStyles?.logo}
        logoAlt={globalStyles?.logoAlt || 'Logo'}
      />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Estilo Principal */}
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
          <AnimatedWrapper show={true}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4">
                Seu Estilo é {category}
              </h2>
              
              <div className="max-w-md mx-auto mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#8F7A6A]">Porcentagem de compatibilidade</span>
                  <span className="text-[#aa6b5d] font-medium">{stylePercentage}%</span>
                </div>
                <div className="w-full h-2 bg-[#F3E8E6] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#B89B7A]" 
                    style={{ width: `${stylePercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-[#432818] leading-relaxed">{styleData.description}</p>

                <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B89B7A]/10">
                  <h3 className="text-lg font-medium text-[#432818] mb-2">
                    Seus Estilos Complementares
                  </h3>
                  {secondaryStyles && secondaryStyles.length > 0 ? (
                    <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                  ) : (
                    <p className="text-sm text-gray-500">Nenhum estilo complementar identificado</p>
                  )}
                </div>
              </div>
              <div>
                <img
                  src={styleData.image}
                  alt={`Estilo ${category}`}
                  className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="mt-8">
              <img
                src={styleData.guideImage}
                alt={`Guia de Estilo ${category}`}
                className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          </AnimatedWrapper>
        </Card>

        <MotivationSection />

        {/* Oferta + Bônus */}
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-3">
              O Guia de Estilo e Imagem + Bônus Exclusivos
            </h2>
            <p className="text-[#432818]">
              Criado para mulheres que querem muito mais do que "saber seu
              estilo".<br />
              Esse guia é pra quem está pronta pra viver seu estilo na prática
              — com consciência, direção e autenticidade.
            </p>
          </div>

          <ProductShowcase />

          <div className="bg-[#fff7f3] p-6 rounded-lg mb-8">
            <h3 className="text-xl font-medium text-[#aa6b5d] mb-4 text-center">
              E ainda recebe 2 bônus poderosos:
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-[#432818] mb-2">
                  Peças-chave do Guarda-Roupa de Sucesso
                </h4>
                <p className="text-sm text-[#432818]/80 mb-4">
                  Itens essenciais que descomplicam a rotina e valorizam o seu
                  estilo pessoal.
                </p>
                <img
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp"
                  alt="Peças-chave do Guarda-Roupa"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-[#432818] mb-2">
                  Mini Guia de Visagismo Facial
                </h4>
                <p className="text-sm text-[#432818]/80 mb-4">
                  Para alinhar seu rosto, cabelo e maquiagem com a sua
                  identidade visual.
                </p>
                <img
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp"
                  alt="Mini Guia de Visagismo Facial"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <img
              src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp"
              alt="Todos os produtos e bônus"
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div className="bg-[#fff7f3] p-6 rounded-lg text-center">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 mb-6">
              <div className="text-center md:text-right">
                <p className="text-sm text-[#432818]/60 mb-1">Valor Total</p>
                <p className="text-xl line-through text-[#432818]/60">
                  R$ 175,00
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#aa6b5d] mb-1">Oferta especial</p>
                <p className="text-3xl font-bold text-[#aa6b5d]">R$ 39,00</p>
              </div>
            </div>

            <Button
              onClick={() =>
                window.open('https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912', '_blank')
              }
              className="w-full max-w-xl mx-auto text-white py-6 text-lg rounded-md bg-brand-gold hover:bg-[#A38A69] transition-colors"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Quero meu Guia + Bônus por R$39,00
            </Button>
            <p className="text-sm text-[#aa6b5d] mt-4">
              ⏳ Oferta válida apenas nesta página
            </p>
          </div>
        </Card>

        <Testimonials />
        <MentorSection />
        <GuaranteeSection />
      </div>
    </div>
  );
};

export default ResultPage;
