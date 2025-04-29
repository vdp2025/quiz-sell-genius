import React from 'react';
import { StyleResult } from '@/types/quiz';

interface SecondaryStylesSectionProps {
  secondaryStyles: StyleResult[];
}

const SecondaryStylesSection: React.FC<SecondaryStylesSectionProps> = ({ secondaryStyles }) => {
  // Pegue apenas os 3 primeiros estilos secundários
  const topStyles = secondaryStyles?.slice(0, 3) || [];

  return (
    <div className="space-y-3">
      {topStyles.map((style, index) => {
        // Verificar se style é um objeto válido
        if (!style || typeof style !== 'object') return null;
        
        // Garantir que estamos acessando as propriedades diretamente, não renderizando o objeto
        const category = typeof style.category === 'string' ? style.category : 'Estilo';
        const percentage = typeof style.percentage === 'number' ? Math.round(style.percentage) : 0;
        
        return (
          <div key={index} className="flex justify-between items-center">
            <span className="text-[#432818] font-medium">{category}</span>
            <span className="text-[#B89B7A]">{percentage}%</span>
          </div>
        );
      })}
    </div>
  );
};

export default SecondaryStylesSection;
