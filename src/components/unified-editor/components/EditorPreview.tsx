import React, { useRef, useState, useEffect } from 'react';
import { useEditorContext } from '@/context/EditorContext';
import { DeviceType } from '@/types/editor';
import { cn } from '@/lib/utils';
import { ElementRenderer } from '@/components/unified-editor/components/ElementRenderer';

interface EditorPreviewProps {
  deviceSize: DeviceType;
}

export function EditorPreview({ deviceSize }: EditorPreviewProps) {
  const { elements, isPreviewing, selectedElement, setSelectedElement } = useEditorContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [dimensions, setDimensions] = useState({ width: 375, height: 667 });

  // Atualiza as dimensões conforme o dispositivo selecionado
  useEffect(() => {
    switch (deviceSize) {
      case 'mobile':
        setDimensions({ width: 375, height: 667 });
        break;
      case 'tablet':
        setDimensions({ width: 768, height: 1024 });
        break;
      case 'desktop':
        setDimensions({ width: 1280, height: 800 });
        break;
      case 'custom':
        // Manter dimensões atuais para custom
        break;
    }
  }, [deviceSize]);

  // Calcula a escala para dispositivos maiores
  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      
      const widthRatio = (containerWidth - 48) / dimensions.width;
      const heightRatio = (containerHeight - 48) / dimensions.height;
      
      const newScale = Math.min(widthRatio, heightRatio, 1);
      setScale(newScale);
    }
  }, [dimensions, containerRef.current?.clientWidth, containerRef.current?.clientHeight]);

  const handleElementClick = (elementId: string) => {
    if (!isPreviewing) {
      const element = elements.find(el => el.id === elementId);
      if (element) {
        setSelectedElement(element);
      }
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center bg-gray-100 overflow-auto">
      <div 
        className={cn(
          "bg-white overflow-auto transition-all shadow-lg",
          deviceSize === 'mobile' ? 'rounded-[32px]' : 'rounded-lg'
        )}
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          border: deviceSize === 'mobile' ? '12px solid #111' : '1px solid #ddd'
        }}
      >
        <div className="relative w-full h-full">
          {/* Sandbox para renderização segura dos elementos */}
          <div className="w-full h-full overflow-auto">
            {elements.length > 0 ? (
              elements.map(element => (
                <ElementRenderer
                  key={element.id}
                  element={element}
                  isSelected={selectedElement?.id === element.id}
                  isEditing={!isPreviewing}
                  onClick={() => handleElementClick(element.id)}
                />
              ))
            ) : (
              <div className="h-full flex items-center justify-center flex-col p-4 text-center">
                <p className="text-gray-400 mb-2">Nenhum elemento disponível para edição</p>
                <p className="text-gray-300 text-sm">
                  Os elementos editáveis serão carregados automaticamente ao visualizar o quiz
                </p>
              </div>
            )}
          </div>
          
          {/* Overlay para selecionar elementos quando não estiver no modo de preview */}
          {!isPreviewing && (
            <div 
              className="absolute inset-0 z-10 pointer-events-none"
              onClick={() => setSelectedElement(null)}
            >
              {/* Elementos clicáveis permanecem interativos */}
              {elements.map(element => (
                <div
                  key={`overlay-${element.id}`}
                  className={`absolute pointer-events-auto cursor-pointer ${
                    selectedElement?.id === element.id 
                      ? 'outline outline-2 outline-blue-500' 
                      : 'hover:outline hover:outline-1 hover:outline-blue-300'
                  }`}
                  style={{
                    top: element.position?.y ? `${element.position.y}px` : 'auto',
                    left: element.position?.x ? `${element.position.x}px` : 'auto',
                    width: element.properties.styles?.width || 'auto',
                    height: element.properties.styles?.height || 'auto'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleElementClick(element.id);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 