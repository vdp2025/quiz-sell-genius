
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { styleConfig } from '@/config/styleConfig';

interface StyleSelectorProps {
  selectedStyle: StyleResult;
  onStyleChange: (style: StyleResult) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleChange }) => {
  const handleStyleChange = (value: string) => {
    onStyleChange({
      category: value as StyleResult['category'],
      score: 0,
      percentage: 100
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block text-[#1A1818]/70">
          Estilo para Editar
        </label>
        <Select value={selectedStyle.category} onValueChange={handleStyleChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione um estilo" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(styleConfig).map((style) => (
              <SelectItem key={style} value={style}>
                {style}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="p-4 border rounded-md bg-[#FAF9F7]">
        <div className="flex items-center space-x-4">
          <img 
            src={styleConfig[selectedStyle.category].image} 
            alt={`Estilo ${selectedStyle.category}`}
            className="w-16 h-16 object-cover rounded-md"
          />
          <div>
            <h3 className="font-medium text-[#432818]">{selectedStyle.category}</h3>
            <p className="text-xs text-[#1A1818]/70 mt-1">
              {styleConfig[selectedStyle.category].description.substring(0, 80)}...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleSelector;
