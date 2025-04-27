
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Image, Type, AlignLeft, CheckSquare, SquareStack, Clock, Eye, EyeOff } from 'lucide-react';

interface ComponentToolbarProps {
  activeStage: any | null;
  onComponentSelect: (type: string) => void;
  isPreviewing: boolean;
  onTogglePreview?: () => void;
}

const ComponentToolbar: React.FC<ComponentToolbarProps> = ({
  activeStage,
  onComponentSelect,
  isPreviewing,
  onTogglePreview
}) => {
  const components = [
    { type: 'header', label: 'Cabeçalho', icon: <Type className="w-4 h-4" /> },
    { type: 'text', label: 'Texto', icon: <AlignLeft className="w-4 h-4" /> },
    { type: 'image', label: 'Imagem', icon: <Image className="w-4 h-4" /> },
    { type: 'multipleChoice', label: 'Múltipla Escolha', icon: <CheckSquare className="w-4 h-4" /> },
    { type: 'singleChoice', label: 'Escolha Única', icon: <SquareStack className="w-4 h-4" /> },
    { type: 'countdown', label: 'Contagem', icon: <Clock className="w-4 h-4" /> }
  ];

  return (
    <div className="p-3 bg-white border-b flex justify-between items-center">
      <div className="flex space-x-2">
        {activeStage && components.map((component) => (
          <Button
            key={component.type}
            variant="outline"
            size="sm"
            className="flex items-center space-x-1"
            onClick={() => onComponentSelect(component.type)}
            disabled={isPreviewing}
          >
            {component.icon}
            <span className="text-xs">{component.label}</span>
          </Button>
        ))}
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center space-x-1"
        onClick={onTogglePreview}
      >
        {isPreviewing ? (
          <>
            <EyeOff className="w-4 h-4" />
            <span className="text-xs">Editar</span>
          </>
        ) : (
          <>
            <Eye className="w-4 h-4" />
            <span className="text-xs">Visualizar</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default ComponentToolbar;
