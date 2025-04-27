import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ContentContainer } from '@/components/shared/ContentContainer';
import { GridLayout } from '@/components/shared/GridLayout';
import { sharedStyles } from '@/styles/sharedStyles';

interface StageResultComponentProps {
  data: QuizComponentData['data'];
  style: QuizComponentData['style'];
  isSelected: boolean;
}

const StageResultComponent: React.FC<StageResultComponentProps> = ({ 
  data, 
  style, 
  isSelected 
}) => {
  // Cores personalizáveis com fallbacks
  const accentColor = data.accentColor || style?.backgroundColor || '#B89B7A';
  const textColor = style?.textColor || sharedStyles.colors.textPrimary || '#432818';
  const backgroundColor = style?.backgroundColor || sharedStyles.colors.background || '#FAF9F7';

  return (
    <div 
      className={cn(
        "w-full",
        isSelected && "ring-2 ring-inset ring-[#B89B7A]/20"
      )}
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        borderRadius: `${style?.borderRadius || 0}px`,
        padding: `${style?.paddingY || 16}px ${style?.paddingX || 16}px`,
      }}
    >
      <ContentContainer size="md">
        {/* Cabeçalho com resultado principal */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-playfair mb-2">
            {data.title || 'Seu Resultado de Estilo Pessoal'}
          </h2>
          
          <p className="text-lg opacity-80">
            {data.subtitle || 'Baseado nas suas escolhas, calculamos seu estilo predominante'}
          </p>

          {/* Exibição do estilo predominante */}
          <div className="mt-6 mb-8">
            <h3 className="text-xl font-medium mb-3">
              {data.primaryStyleTitle || 'Seu Estilo Predominante'}
            </h3>
            <div 
              className="inline-block px-6 py-3 rounded-md text-white font-medium text-xl shadow-md"
              style={{ backgroundColor: accentColor }}
            >
              Elegante
            </div>
          </div>

          {/* Estilos secundários */}
          {data.showSecondaryStyles !== false && (
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-3">
                {data.secondaryStylesTitle || 'Seus Estilos Complementares'}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {['Romântico', 'Clássico', 'Contemporâneo'].map((style, index) => (
                  <div 
                    key={index}
                    className="px-4 py-2 rounded border-2 font-medium"
                    style={{ 
                      borderColor: accentColor,
                      color: textColor,
                    }}
                  >
                    {style} {data.showPercentages && <span className="opacity-70">{30 - index * 10}%</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Seção de oferta com imagens */}
        <div className="bg-white/50 rounded-xl p-6 shadow-sm mb-8">
          <h3 className="text-2xl font-playfair text-center mb-6" style={{ color: accentColor }}>
            {data.offerTitle || 'Conheça o Guia Completo de Estilo'}
          </h3>
          
          <GridLayout columns={2} gap="lg" className="mb-8">
            <div>
              <img
                src={data.offerImageUrl || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp"}
                alt="Guia Completo de Estilo"
                className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <img
                src={data.authorImageUrl || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp"}
                alt="Autor do Guia"
                className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          </GridLayout>
          
          {/* Benefícios da oferta */}
          <div className="mb-8">
            <h4 className="text-xl font-medium mb-4 text-center">
              {data.benefitsTitle || 'O que você vai encontrar no guia:'}
            </h4>
            <ul className="space-y-3 max-w-xl mx-auto">
              {(data.benefits || [
                'Análise completa do seu estilo pessoal',
                'Guia de combinações perfeitas para seu tipo',
                'Dicas de peças essenciais para seu guarda-roupa',
                'Como valorizar seus pontos fortes e criar seu estilo único'
              ]).map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span 
                    className="inline-block w-5 h-5 mt-0.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: accentColor }}
                  ></span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Botão de Call to Action */}
          <div className="flex justify-center">
            <Button className="px-6 py-6 rounded-md text-lg font-medium shadow-md hover:shadow-lg transition-all"
              style={{ 
                backgroundColor: accentColor,
                color: 'white',
              }}>
              {data.callToActionText || 'Conhecer o Guia Completo'}
            </Button>
          </div>
        </div>
        
        {/* Rodapé com navegação */}
        <div className="mt-6 text-sm opacity-60 text-center">
          {data.stageTitle || 'Resultado'} • {data.stageNumber || 7} de {data.totalStages || 7}
        </div>
      </ContentContainer>
    </div>
  );
};

export default StageResultComponent;

