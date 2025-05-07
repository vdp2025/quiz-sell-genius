
import React from 'react';

export const highlightStrategicWords = (text: string): React.ReactNode => {
  const strategicWords = [
    // Personal Growth & Transformation
    'transformar', 'evoluir', 'versão', 'autenticidade', 'experiência',
    'clareza', 'intenção', 'propósito', 'consciência', 'confiante',
    
    // Style & Image Related
    'imagem', 'estilo', 'presença', 'elegância', 'identidade',
    'combiná-las', 'looks', 'peças', 'roupas', 'guarda-roupa',
    
    // Emotional States
    'desconectada', 'dúvidas', 'segura', 'confiante', 'arrependo',
    'indecisão', 'limitada', 'impulso',
    
    // Quality & Value Words
    'autoridade', 'admirada', 'estilosa', 'exclusivo', 'estratégico',
    'prático', 'completa', 'perfeito', 'facilidade',
    
    // Key Concepts
    'investimento', 'resultado', 'experiência', 'material', 'compromisso',
    'escolhas', 'autenticidade', 'leveza',
    
    // Action Words
    'transformar', 'aplicar', 'comprar', 'vestir', 'montar',
    'criar', 'usar', 'valoriza', 'funciona'
  ];

  // Remove duplicates and sort by length (longer words first to prevent partial matches)
  const uniqueSortedWords = [...new Set(strategicWords)]
    .sort((a, b) => b.length - a.length);

  const pattern = new RegExp(`(${uniqueSortedWords.join('|')})`, 'gi');
  const parts = text.split(pattern);
  
  return parts.map((part, index) => {
    if (uniqueSortedWords.some(word => part.toLowerCase() === word.toLowerCase())) {
      return React.createElement('strong', { 
        key: index, 
        className: 'text-[#432818] font-medium'  // Changed to match the coffee color theme
      }, part);
    }
    return part;
  });
};

