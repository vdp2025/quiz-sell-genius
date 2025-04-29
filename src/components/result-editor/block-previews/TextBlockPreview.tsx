import React from 'react';

interface TextBlockPreviewProps {
  content: {
    text?: string;
    alignment?: 'left' | 'center' | 'right';
    textColor?: string;
    style?: Record<string, any>;
  };
}

const TextBlockPreview: React.FC<TextBlockPreviewProps> = ({ content }) => {
  // Garantir que content seja um objeto válido
  const safeContent = content || {};
  
  // Extrair valores de forma segura
  const alignment = typeof safeContent.alignment === 'string' ? safeContent.alignment : 'left';
  const textColor = typeof safeContent.textColor === 'string' ? safeContent.textColor : '#1A1818';
  const text = typeof safeContent.text === 'string' ? safeContent.text : 'Digite seu texto aqui...';
  const style = safeContent.style && typeof safeContent.style === 'object' ? safeContent.style : {};
  
  // Construir objeto de estilo de forma segura
  const textStyle = {
    textAlign: alignment,
    color: textColor,
    ...style
  };

  return (
    <div className="prose max-w-none" style={textStyle}>
      <p className="text-[#1A1818]/90">
        {text}
      </p>
    </div>
  );
};

export default TextBlockPreview;
