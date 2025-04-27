
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EnhancedImagePropertiesProps {
  imageUrl: string;
  altText?: string;
  borderRadius?: 'none' | 'small' | 'medium' | 'large';
  maxWidth?: string;
  aspectRatio?: string;
  onUpdate: (updates: any) => void;
}

const EnhancedImageProperties: React.FC<EnhancedImagePropertiesProps> = ({
  imageUrl,
  altText = '',
  borderRadius = 'none',
  maxWidth = '100%',
  aspectRatio = 'auto',
  onUpdate,
}) => {
  const handleImageUpload = () => {
    // In a real implementation, this would open a file picker
    console.log('Image upload functionality would be implemented here');
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="imageUrl">URL da Imagem</Label>
        <Input
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => onUpdate({ imageUrl: e.target.value })}
          placeholder="https://exemplo.com/imagem.jpg"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="altText">Texto Alternativo</Label>
        <Input
          id="altText"
          value={altText}
          onChange={(e) => onUpdate({ altText: e.target.value })}
          placeholder="Descrição da imagem"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="borderRadius">Borda Arredondada</Label>
        <Select 
          value={borderRadius}
          onValueChange={(value) => onUpdate({ borderRadius: value })}
        >
          <SelectTrigger id="borderRadius">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Sem arredondamento</SelectItem>
            <SelectItem value="small">Pequeno</SelectItem>
            <SelectItem value="medium">Médio</SelectItem>
            <SelectItem value="large">Grande</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="maxWidth">Largura Máxima</Label>
        <Input
          id="maxWidth"
          value={maxWidth}
          onChange={(e) => onUpdate({ maxWidth: e.target.value })}
          placeholder="100%, 500px, etc."
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="aspectRatio">Proporção</Label>
        <Select 
          value={aspectRatio}
          onValueChange={(value) => onUpdate({ aspectRatio: value })}
        >
          <SelectTrigger id="aspectRatio">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Original</SelectItem>
            <SelectItem value="1/1">Quadrado (1:1)</SelectItem>
            <SelectItem value="16/9">Widescreen (16:9)</SelectItem>
            <SelectItem value="4/3">Standard (4:3)</SelectItem>
            <SelectItem value="3/2">Cartão postal (3:2)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        variant="outline" 
        onClick={handleImageUpload}
        className="w-full"
      >
        Escolher Imagem
      </Button>
    </div>
  );
};

export default EnhancedImageProperties;
