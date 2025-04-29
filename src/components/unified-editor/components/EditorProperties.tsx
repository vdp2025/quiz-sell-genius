import React from 'react';
import { useEditorContext } from '@/context/EditorContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Paintbrush, Type, Link, Info } from 'lucide-react';
import { TextPropertiesPanel } from './properties/TextPropertiesPanel';
import { StylePropertiesPanel } from './properties/StylePropertiesPanel';
import { LinkPropertiesPanel } from './properties/LinkPropertiesPanel';
import { AdvancedPropertiesPanel } from './properties/AdvancedPropertiesPanel';

export function EditorProperties() {
  const { selectedElement, updateElement } = useEditorContext();
  
  // Se não houver elemento selecionado, exibir mensagem
  if (!selectedElement) {
    return (
      <div className="h-full flex flex-col justify-center items-center p-4 text-center bg-white border-l">
        <div className="max-w-xs">
          <Info className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhum elemento selecionado</h3>
          <p className="text-sm text-gray-500">
            Selecione um elemento no editor para visualizar e editar suas propriedades.
          </p>
        </div>
      </div>
    );
  }
  
  // Determinar quais abas mostrar com base no tipo do elemento
  const showTextTab = ['text', 'question', 'button', 'option', 'result', 'offer'].includes(selectedElement.type);
  const showLinkTab = ['button', 'image'].includes(selectedElement.type);
  
  return (
    <div className="h-full flex flex-col bg-white border-l">
      <div className="border-b p-4">
        <h2 className="font-medium">
          Propriedades: <span className="text-blue-500">{selectedElement.type}</span>
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          ID: {selectedElement.id.substring(0, 8)}
        </p>
      </div>
      
      <Tabs defaultValue="style" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-4 mx-4 mt-2">
          <TabsTrigger value="style" className="flex items-center gap-1">
            <Paintbrush className="w-3 h-3" />
            <span>Estilo</span>
          </TabsTrigger>
          
          {showTextTab && (
            <TabsTrigger value="text" className="flex items-center gap-1">
              <Type className="w-3 h-3" />
              <span>Texto</span>
            </TabsTrigger>
          )}
          
          {showLinkTab && (
            <TabsTrigger value="link" className="flex items-center gap-1">
              <Link className="w-3 h-3" />
              <span>Link</span>
            </TabsTrigger>
          )}
          
          <TabsTrigger value="advanced" className="flex items-center gap-1">
            <Info className="w-3 h-3" />
            <span>Avançado</span>
          </TabsTrigger>
        </TabsList>
        
        <ScrollArea className="flex-1 p-4">
          <TabsContent value="style" className="mt-0">
            <StylePropertiesPanel 
              element={selectedElement} 
              onChange={(updates) => updateElement(selectedElement.id, updates)} 
            />
          </TabsContent>
          
          {showTextTab && (
            <TabsContent value="text" className="mt-0">
              <TextPropertiesPanel 
                element={selectedElement} 
                onChange={(updates) => updateElement(selectedElement.id, updates)} 
              />
            </TabsContent>
          )}
          
          {showLinkTab && (
            <TabsContent value="link" className="mt-0">
              <LinkPropertiesPanel 
                element={selectedElement} 
                onChange={(updates) => updateElement(selectedElement.id, updates)} 
              />
            </TabsContent>
          )}
          
          <TabsContent value="advanced" className="mt-0">
            <AdvancedPropertiesPanel 
              element={selectedElement} 
              onChange={(updates) => updateElement(selectedElement.id, updates)} 
            />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
} 