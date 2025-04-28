import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { useEditorContext } from '@/context/EditorContext';
import { ElementType } from '@/types/editor';
import { PlusCircle, Settings, Layers, PenTool, Image, Type, Button as ButtonIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EditorSidebar() {
  const { elements, setSelectedElement, selectedElement } = useEditorContext();
  
  // Elementos agrupados por tipo
  const groupedElements = {
    text: elements.filter(el => el.type === 'text' || el.type === 'question'),
    image: elements.filter(el => el.type === 'image'),
    button: elements.filter(el => el.type === 'button'),
    result: elements.filter(el => el.type === 'result' || el.type === 'offer')
  };
  
  const handleElementSelect = (element: ElementType) => {
    setSelectedElement(element);
  };
  
  const renderElementItem = (element: ElementType) => {
    // Renderiza elementos editáveis com ícone apropriado
    const getIcon = () => {
      switch (element.type) {
        case 'text':
        case 'question':
          return <Type className="w-4 h-4" />;
        case 'image':
          return <Image className="w-4 h-4" />;
        case 'button':
          return <ButtonIcon className="w-4 h-4" />;
        case 'result':
        case 'offer':
          return <Settings className="w-4 h-4" />;
        default:
          return <Layers className="w-4 h-4" />;
      }
    };
    
    return (
      <div 
        key={element.id}
        className={`flex items-center gap-2 p-2 cursor-pointer rounded hover:bg-gray-100 ${
          selectedElement?.id === element.id ? 'bg-blue-50 border-l-2 border-blue-500' : ''
        }`}
        onClick={() => handleElementSelect(element)}
      >
        {getIcon()}
        <span className="text-sm truncate flex-1">
          {element.content.substring(0, 20) || element.type}
          {element.content.length > 20 ? '...' : ''}
        </span>
      </div>
    );
  };
  
  return (
    <div className="h-full flex flex-col border-r bg-white">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <PenTool className="w-5 h-5" />
          Editor de Elementos
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Selecione um elemento para editar
        </p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-3">
          <Accordion type="multiple" defaultValue={['text', 'image', 'button', 'result']}>
            {/* Textos e Perguntas */}
            <AccordionItem value="text">
              <AccordionTrigger className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  <span>Textos e Perguntas</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1 pl-2">
                  {groupedElements.text.length > 0 ? (
                    groupedElements.text.map(renderElementItem)
                  ) : (
                    <div className="text-sm text-gray-500 p-2">Nenhum texto editável</div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Imagens */}
            <AccordionItem value="image">
              <AccordionTrigger className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  <span>Imagens</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1 pl-2">
                  {groupedElements.image.length > 0 ? (
                    groupedElements.image.map(renderElementItem)
                  ) : (
                    <div className="text-sm text-gray-500 p-2">Nenhuma imagem editável</div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Botões */}
            <AccordionItem value="button">
              <AccordionTrigger className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <ButtonIcon className="w-4 h-4" />
                  <span>Botões</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1 pl-2">
                  {groupedElements.button.length > 0 ? (
                    groupedElements.button.map(renderElementItem)
                  ) : (
                    <div className="text-sm text-gray-500 p-2">Nenhum botão editável</div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Resultados e Ofertas */}
            <AccordionItem value="result">
              <AccordionTrigger className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>Resultados e Ofertas</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1 pl-2">
                  {groupedElements.result.length > 0 ? (
                    groupedElements.result.map(renderElementItem)
                  ) : (
                    <div className="text-sm text-gray-500 p-2">Nenhum resultado editável</div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t">
        <Button variant="outline" className="w-full flex items-center gap-2" disabled>
          <PlusCircle className="w-4 h-4" />
          <span>Detecção Automática</span>
        </Button>
      </div>
    </div>
  );
} 