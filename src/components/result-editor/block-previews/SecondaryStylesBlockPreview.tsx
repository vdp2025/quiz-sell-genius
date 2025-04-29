import React from 'react';

interface SecondaryStylesBlockPreviewProps {
  content: {
    title?: string;
    style?: Record<string, any>;
  };
}

const SecondaryStylesBlockPreview: React.FC<SecondaryStylesBlockPreviewProps> = ({ content }) => {
  // Garantir que content seja um objeto válido com propriedades seguras
  const safeContent = {
    title: typeof content?.title === 'string' ? content.title : 'Seus Estilos Complementares',
    style: content?.style && typeof content.style === 'object' ? content.style : {}
  };

  return (
    <div style={safeContent.style}>
      <h3 className="text-xl font-bold mb-4 text-[#aa6b5d] text-center">
        {safeContent.title}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#fff7f3] p-4 rounded-lg">
          <h4 className="font-medium text-[#aa6b5d] mb-2">Natural</h4>
          <p className="text-[#1A1818]/80 text-sm">
            Você valoriza o conforto e a praticidade. Seu estilo é descontraído e casual, com peças fáceis de usar no dia a dia.
          </p>
        </div>
        
        <div className="bg-[#fff7f3] p-4 rounded-lg">
          <h4 className="font-medium text-[#aa6b5d] mb-2">Contemporâneo</h4>
          <p className="text-[#1A1818]/80 text-sm">
            Você gosta de estar atualizado e seguir as tendências. Seu estilo é moderno e versátil, combinando o clássico com o atual.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecondaryStylesBlockPreview;
