import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DeviceType } from '@/types/editor';
import { 
  Save, 
  Eye, 
  EyeOff,
  Undo, 
  Redo, 
  FileDown, 
  FileUp,
  Settings 
} from 'lucide-react';

interface EditorToolbarProps {
  isPreviewing: boolean;
  onPreviewToggle: () => void;
  onSave: () => Promise<boolean>;
  deviceSize?: DeviceType;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onExport?: () => void;
  onImport?: () => void;
  onSettings?: () => void;
}

export function EditorToolbar({ 
  isPreviewing,
  onPreviewToggle,
  onSave,
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
  onExport,
  onImport,
  onSettings
}: EditorToolbarProps) {
  return (
    <div className="flex items-center gap-2 p-2 bg-white border-b shadow-sm">
      <div className="flex items-center">
        <Button 
          onClick={onSave} 
          className="flex items-center gap-1"
          title="Salvar alterações"
        >
          <Save className="w-4 h-4" />
          <span className="hidden md:inline">Salvar</span>
        </Button>
      </div>
      
      <Separator orientation="vertical" className="h-6" />
      
      <div className="flex items-center gap-1">
        <Button
          onClick={onPreviewToggle}
          variant="outline"
          className="flex items-center gap-1"
          title={isPreviewing ? "Sair do modo de visualização" : "Visualizar"}
        >
          {isPreviewing ? (
            <>
              <EyeOff className="w-4 h-4" />
              <span className="hidden md:inline">Editar</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              <span className="hidden md:inline">Visualizar</span>
            </>
          )}
        </Button>
      </div>
      
      <Separator orientation="vertical" className="h-6" />
      
      <div className="flex items-center gap-1">
        <Button
          onClick={onUndo}
          variant="outline"
          disabled={!canUndo}
          className="flex items-center gap-1"
          title="Desfazer"
        >
          <Undo className="w-4 h-4" />
        </Button>
        
        <Button
          onClick={onRedo}
          variant="outline"
          disabled={!canRedo}
          className="flex items-center gap-1"
          title="Refazer"
        >
          <Redo className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex-1" />
      
      <div className="flex items-center gap-1">
        {onExport && (
          <Button
            onClick={onExport}
            variant="outline"
            className="flex items-center gap-1"
            title="Exportar configurações"
          >
            <FileDown className="w-4 h-4" />
            <span className="hidden md:inline">Exportar</span>
          </Button>
        )}
        
        {onImport && (
          <Button
            onClick={onImport}
            variant="outline"
            className="flex items-center gap-1"
            title="Importar configurações"
          >
            <FileUp className="w-4 h-4" />
            <span className="hidden md:inline">Importar</span>
          </Button>
        )}
        
        {onSettings && (
          <Button
            onClick={onSettings}
            variant="outline"
            className="flex items-center gap-1"
            title="Configurações do editor"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden md:inline">Configurações</span>
          </Button>
        )}
      </div>
    </div>
  );
} 