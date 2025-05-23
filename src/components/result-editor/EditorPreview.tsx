
import React from 'react';
import { Block } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StyleResult } from '@/types/quiz';
import EditableBlock from './EditableBlock';

interface EditorPreviewProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  isPreviewing: boolean;
  primaryStyle: StyleResult;
  onReorderBlocks: (sourceIndex: number, destinationIndex: number) => void;
}

export function EditorPreview({
  blocks,
  selectedBlockId,
  onSelectBlock,
  isPreviewing,
  primaryStyle,
  onReorderBlocks
}: EditorPreviewProps) {
  const [viewMode, setViewMode] = React.useState<'desktop' | 'mobile'>('desktop');

  return (
    <div className="h-full flex flex-col">
      {/* Preview Controls */}
      <div className="border-b border-[#B89B7A]/20 p-4 bg-white flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('desktop')}
            className={cn(viewMode === 'desktop' && 'bg-[#FAF9F7]')}
          >
            <Monitor className="w-4 h-4 mr-2" />
            Desktop
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('mobile')}
            className={cn(viewMode === 'mobile' && 'bg-[#FAF9F7]')}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile
          </Button>
        </div>

        <Button variant="outline" size="sm">
          <Eye className="w-4 h-4 mr-2" />
          {isPreviewing ? 'Editar' : 'Visualizar'}
        </Button>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto p-4 bg-[#FAF9F7]">
        <div className={cn(
          "min-h-full bg-white rounded-lg shadow-sm p-6",
          viewMode === 'mobile' && 'max-w-md mx-auto'
        )}>
          {blocks.length === 0 ? (
            <div className="text-center p-8 border-2 border-dashed border-[#B89B7A]/40 rounded-lg">
              <p className="text-[#8F7A6A] mb-4">Adicione componentes usando o painel lateral</p>
              <Button 
                variant="outline" 
                className="border-[#B89B7A] text-[#B89B7A]"
                onClick={() => {/* Add first block functionality here */}}
              >
                Adicionar Primeiro Componente
              </Button>
            </div>
          ) : (
            blocks.map((block, index) => (
              <EditableBlock
                key={block.id}
                block={block}
                index={index}
                isSelected={block.id === selectedBlockId}
                onClick={() => onSelectBlock(block.id)}
                isPreviewMode={isPreviewing}
                onReorderBlocks={onReorderBlocks}
                primaryStyle={primaryStyle}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
