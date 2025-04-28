import React from 'react';
import { ElementType } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ColorPicker } from '@/components/ui/color-picker';
import { cn } from '@/lib/utils';

interface StylePropertiesPanelProps {
  element: ElementType;
  onChange: (updates: Partial<ElementType>) => void;
}

export function StylePropertiesPanel({ element, onChange }: StylePropertiesPanelProps) {
  const styles = element.properties.styles || {};
  
  const updateStyle = (property: string, value: string) => {
    onChange({
      properties: {
        ...element.properties,
        styles: {
          ...styles,
          [property]: value
        }
      }
    });
  };
  
  return (
    <div className="space-y-4">
      {/* Cores */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Cores</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Cor de fundo */}
          <div className="space-y-1.5">
            <Label htmlFor="bgColor">Cor de fundo</Label>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-8 h-8 p-0 border"
                    style={{ backgroundColor: styles.backgroundColor || 'transparent' }}
                  >
                    <span className="sr-only">Escolher cor</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <ColorPicker
                    color={styles.backgroundColor || '#ffffff'}
                    onChange={(color) => updateStyle('backgroundColor', color)}
                  />
                </PopoverContent>
              </Popover>
              
              <Input
                id="bgColor"
                value={styles.backgroundColor || ''}
                onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                className="font-mono text-xs"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
          
          {/* Cor do texto */}
          <div className="space-y-1.5">
            <Label htmlFor="textColor">Cor do texto</Label>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-8 h-8 p-0 border"
                    style={{ backgroundColor: styles.color || 'transparent' }}
                  >
                    <span className="sr-only">Escolher cor</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <ColorPicker
                    color={styles.color || '#000000'}
                    onChange={(color) => updateStyle('color', color)}
                  />
                </PopoverContent>
              </Popover>
              
              <Input
                id="textColor"
                value={styles.color || ''}
                onChange={(e) => updateStyle('color', e.target.value)}
                className="font-mono text-xs"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Tipografia */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Tipografia</h3>
        
        <div className="space-y-3">
          {/* Tamanho da fonte */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <Label htmlFor="fontSize">Tamanho da fonte</Label>
              <span className="text-xs text-gray-500">{styles.fontSize || '16px'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Slider
                value={[parseInt(styles.fontSize || '16') || 16]}
                min={8}
                max={72}
                step={1}
                onValueChange={(value) => updateStyle('fontSize', `${value[0]}px`)}
                className="flex-1"
              />
              <Input
                id="fontSize"
                value={styles.fontSize || ''}
                onChange={(e) => updateStyle('fontSize', e.target.value)}
                className="w-16 font-mono text-xs"
                placeholder="16px"
              />
            </div>
          </div>
          
          {/* Peso da fonte */}
          <div className="space-y-1.5">
            <Label htmlFor="fontWeight">Peso da fonte</Label>
            <div className="grid grid-cols-4 gap-2">
              {['normal', '500', 'bold', '900'].map((weight) => (
                <Button
                  key={weight}
                  variant={styles.fontWeight === weight ? 'default' : 'outline'}
                  onClick={() => updateStyle('fontWeight', weight)}
                  className={cn(
                    "text-sm",
                    weight === 'normal' && "font-normal",
                    weight === '500' && "font-medium",
                    weight === 'bold' && "font-bold",
                    weight === '900' && "font-black"
                  )}
                >
                  {weight === 'normal' ? 'Normal' : weight}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Espaçamento e tamanho */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Espaçamento e tamanho</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Padding */}
          <div className="space-y-1.5">
            <Label htmlFor="padding">Padding</Label>
            <Input
              id="padding"
              value={styles.padding || ''}
              onChange={(e) => updateStyle('padding', e.target.value)}
              placeholder="10px"
              className="font-mono text-xs"
            />
          </div>
          
          {/* Margin */}
          <div className="space-y-1.5">
            <Label htmlFor="margin">Margin</Label>
            <Input
              id="margin"
              value={styles.margin || ''}
              onChange={(e) => updateStyle('margin', e.target.value)}
              placeholder="0px"
              className="font-mono text-xs"
            />
          </div>
          
          {/* Width */}
          <div className="space-y-1.5">
            <Label htmlFor="width">Largura</Label>
            <Input
              id="width"
              value={styles.width || ''}
              onChange={(e) => updateStyle('width', e.target.value)}
              placeholder="auto"
              className="font-mono text-xs"
            />
          </div>
          
          {/* Height */}
          <div className="space-y-1.5">
            <Label htmlFor="height">Altura</Label>
            <Input
              id="height"
              value={styles.height || ''}
              onChange={(e) => updateStyle('height', e.target.value)}
              placeholder="auto"
              className="font-mono text-xs"
            />
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Bordas e sombras */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Bordas e sombras</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Border radius */}
          <div className="space-y-1.5">
            <Label htmlFor="borderRadius">Borda arredondada</Label>
            <Input
              id="borderRadius"
              value={styles.borderRadius || ''}
              onChange={(e) => updateStyle('borderRadius', e.target.value)}
              placeholder="0px"
              className="font-mono text-xs"
            />
          </div>
          
          {/* Border color */}
          <div className="space-y-1.5">
            <Label htmlFor="borderColor">Cor da borda</Label>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-8 h-8 p-0 border"
                    style={{ backgroundColor: styles.borderColor || 'transparent' }}
                  >
                    <span className="sr-only">Escolher cor</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <ColorPicker
                    color={styles.borderColor || '#000000'}
                    onChange={(color) => updateStyle('borderColor', color)}
                  />
                </PopoverContent>
              </Popover>
              
              <Input
                id="borderColor"
                value={styles.borderColor || ''}
                onChange={(e) => updateStyle('borderColor', e.target.value)}
                className="font-mono text-xs"
                placeholder="#000000"
              />
            </div>
          </div>
          
          {/* Sombra */}
          <div className="space-y-1.5 col-span-2">
            <Label htmlFor="shadow">Sombra</Label>
            <Input
              id="shadow"
              value={styles.shadow || ''}
              onChange={(e) => updateStyle('shadow', e.target.value)}
              placeholder="0px 2px 4px rgba(0,0,0,0.1)"
              className="font-mono text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 