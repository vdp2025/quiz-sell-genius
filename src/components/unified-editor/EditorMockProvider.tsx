
import React, { ReactNode, createContext, useContext, useState } from 'react';

// Mock context state
interface EditorMockContextType {
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedElement: string | null;
  setSelectedElement: (id: string | null) => void;
}

const EditorMockContext = createContext<EditorMockContextType | undefined>(undefined);

export const useEditorMock = () => {
  const context = useContext(EditorMockContext);
  if (context === undefined) {
    throw new Error('useEditorMock must be used within an EditorMockProvider');
  }
  return context;
};

interface EditorMockProviderProps {
  children: ReactNode;
}

export const EditorMockProvider: React.FC<EditorMockProviderProps> = ({ children }) => {
  const [currentView, setCurrentView] = useState('design');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  return (
    <EditorMockContext.Provider 
      value={{ currentView, setCurrentView, selectedElement, setSelectedElement }}
    >
      {children}
    </EditorMockContext.Provider>
  );
};
