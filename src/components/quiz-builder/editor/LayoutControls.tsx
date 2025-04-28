
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LayoutControlsProps {
  layout: {
    columns?: number;
    direction?: 'horizontal' | 'vertical';
    spacing?: number;
  };
  onChange: (layout: any) => void;
}

const LayoutControls: React.FC<LayoutControlsProps> = ({ layout, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Número de Colunas</Label>
        <Select
          value={String(layout.columns || 1)}
          onValueChange={(value) => onChange({ ...layout, columns: parseInt(value) })}
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
            onChange({ ...layout, direction: value })
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
          <span className="text-xs text-gray-500">{layout.spacing || 4}</span>
        </div>
        <Slider
          value={[layout.spacing || 4]}
          min={0}
          max={12}
          step={1}
          onValueChange={(value) => onChange({ ...layout, spacing: value[0] })}
        />
      </div>
    </div>
  );
};

export default LayoutControls;
