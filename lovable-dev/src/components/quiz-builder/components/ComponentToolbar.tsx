
import React from 'react';
import { QuizStage, QuizComponentType } from '@/types/quizBuilder';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Eye, EyeOff, Heading, Text, Image, ListOrdered, CheckCircle, LayoutGrid } from 'lucide-react';

interface ComponentToolbarProps {
  activeStage: QuizStage | null;
  onComponentSelect: (type: string) => void;
  isPreviewing: boolean;
}

export const ComponentToolbar: React.FC<ComponentToolbarProps> = ({
  activeStage,
  onComponentSelect,
  isPreviewing
}) => {
  if (!activeStage) {
    return (
      <div className="border-b bg-white p-3 flex items-center justify-between opacity-50">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-500">Selecione uma etapa para adicionar componentes</p>
        </div>
      </div>
    );
  }

  const componentTypes: { type: QuizComponentType; label: string; icon: React.ElementType }[] = [
    { type: 'header', label: 'Cabeçalho', icon: Heading },
    { type: 'text', label: 'Texto', icon: Text },
    { type: 'image', label: 'Imagem', icon: Image },
    { type: 'multipleChoice', label: 'Múltipla Escolha', icon: ListOrdered },
    { type: 'singleChoice', label: 'Escolha Única', icon: CheckCircle },
    { type: 'columns', label: 'Colunas', icon: LayoutGrid },
  ];

  return (
    <div className="border-b bg-white p-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {!isPreviewing && componentTypes.map((component) => (
          <Tooltip key={component.type}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                onClick={() => onComponentSelect(component.type)}
              >
                <component.icon className="w-4 h-4 mr-1" />
                {component.label}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adicionar {component.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      
      <div className="flex items-center">
        <Button variant="ghost" size="sm" className="text-gray-500">
          {isPreviewing ? (
            <>
              <EyeOff className="w-4 h-4 mr-1" />
              <span>Editando</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-1" />
              <span>Visualizando</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
