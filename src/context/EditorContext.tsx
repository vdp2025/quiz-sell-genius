import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ElementType } from '@/types/editor';

// Tipos para o contexto do editor
type EditorContextType = {
  selectedElement: ElementType | null;
  setSelectedElement: (element: ElementType | null) => void;
  isPreviewing: boolean;
  togglePreview: () => void;
  saveChanges: () => Promise<boolean>;
  elements: ElementType[];
  updateElement: (id: string, properties: Partial<ElementType>) => void;
};

// Contexto do editor
const EditorContext = createContext<EditorContextType | undefined>(undefined);

// Provider do contexto
export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedElement, setSelectedElement] = useState<ElementType | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [elements, setElements] = useState<ElementType[]>([]);

  // Alternar modo de preview
  const togglePreview = () => setIsPreviewing(!isPreviewing);

  // Atualizar elemento
  const updateElement = (id: string, properties: Partial<ElementType>) => {
    setElements(prev => 
      prev.map(element => 
        element.id === id ? { ...element, ...properties } : element
      )
    );
  };

  // Salvar alterações
  const saveChanges = async (): Promise<boolean> => {
    try {
      // Aqui seria implementada a lógica para salvar as alterações no backend
      localStorage.setItem('quizEditorElements', JSON.stringify(elements));
      return true;
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
      return false;
    }
  };

  return (
    <EditorContext.Provider
      value={{
        selectedElement,
        setSelectedElement,
        isPreviewing,
        togglePreview,
        saveChanges,
        elements,
        updateElement
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

// Hook para usar o contexto
export const useEditorContext = (): EditorContextType => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditorContext deve ser usado dentro de um EditorProvider');
  }
  return context;
}; 