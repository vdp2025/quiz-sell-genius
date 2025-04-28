
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QuizComponentLayout } from '@/types/quizBuilder/componentTypes';

interface LayoutControlsProps {
  layout: Partial<QuizComponentLayout>;
  onLayoutChange: (layout: Partial<QuizComponentLayout>) => void;
}

const LayoutControls: React.FC<LayoutControlsProps> = ({ layout, onLayoutChange }) => {
  // Convert string spacing to number for the slider if needed
  const spacingValue = typeof layout.spacing === 'string' 
    ? getSpacingNumber(layout.spacing) 
    : (layout.spacing || 4);

  const handleSpacingChange = (value: number) => {
    // Convert the number back to the expected string format
    const spacingString = getSpacingString(value);
    onLayoutChange({ ...layout, spacing: spacingString });
  };

  // Helper function to convert spacing string to number
  function getSpacingNumber(spacing: string): number {
    switch (spacing) {
      case 'none': return 0;
      case 'small': return 2;
      case 'medium': return 4;
      case 'large': return 8;
      default: return 4; // Default medium spacing
    }
  }

  // Helper function to convert number to spacing string
  function getSpacingString(value: number): 'none' | 'small' | 'medium' | 'large' {
    if (value <= 1) return 'none';
    if (value <= 3) return 'small';
    if (value <= 6) return 'medium';
    return 'large';
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Número de Colunas</Label>
        <Select
          value={String(layout.columns || 1)}
          onValueChange={(value) => onLayoutChange({ ...layout, columns: parseInt(value) as 1 | 2 | 3 | 4 })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o número de colunas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Coluna</SelectItem>
            <SelectItem value="2">2 Colunas</SelectItem>
            <SelectItem value="3">3 Colunas</SelectItem>
            <SelectItem value="4">4 Colunas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Direção</Label>
        <RadioGroup
          value={layout.direction || 'vertical'}
          onValueChange={(value: 'horizontal' | 'vertical') => 
            onLayoutChange({ ...layout, direction: value })
          }
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vertical" id="vertical" />
            <Label htmlFor="vertical">Vertical</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="horizontal" id="horizontal" />
            <Label htmlFor="horizontal">Horizontal</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Espaçamento</Label>
          <span className="text-xs text-gray-500">{spacingValue}</span>
        </div>
        <Slider
          value={[spacingValue]}
          min={0}
          max={12}
          step={1}
          onValueChange={(value) => handleSpacingChange(value[0])}
        />
      </div>
    </div>
  );
};

export default LayoutControls;
