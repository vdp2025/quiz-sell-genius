import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Save, RefreshCw, PaintBrush, Layout } from 'lucide-react';
import { JsonConfigEditor } from './JsonConfigEditor';
import { RemoteConfigImporter } from './RemoteConfigImporter';
import { ConfigExporter } from './ConfigExporter';

interface EditorToolbarProps {
  onSave: () => void;
  isPreviewMode: boolean;
  onPreviewToggle: () => void;
  onReset: () => void;
  onEditGlobalStyles: () => void;
  resultPageConfig: any;
  onUpdateConfig: (config: any) => void;
  onShowTemplates?: () => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onSave,
  isPreviewMode,
  onPreviewToggle,
  onReset,
  onEditGlobalStyles,
  resultPageConfig,
  onUpdateConfig,
  onShowTemplates
}) => {
  return (
    <div className="bg-white border-b p-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <h1 className="text-lg font-medium text-gray-900 mr-4">Editor de Página de Resultados</h1>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onPreviewToggle}
          className="text-sm"
        >
          {isPreviewMode ? (
            <>
              <EyeOff className="mr-2 h-4 w-4" />
              Modo Edição
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" />
              Pré-visualizar
            </>
          )}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onEditGlobalStyles}
          className="text-sm"
        >
          <PaintBrush className="mr-2 h-4 w-4" />
          Estilos Globais
        </Button>
        
        {onShowTemplates && (
          <Button
            variant="outline"
            size="sm"
            onClick={onShowTemplates}
            className="text-sm"
          >
            <Layout className="mr-2 h-4 w-4" />
            Templates
          </Button>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <RemoteConfigImporter onImportConfig={onUpdateConfig} />
        
        <ConfigExporter config={resultPageConfig} />
        
        <JsonConfigEditor 
          config={resultPageConfig} 
          onUpdateConfig={onUpdateConfig} 
        />
        
        <Separator orientation="vertical" className="h-6" />
        
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="text-sm"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Redefinir
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={onSave}
          className="text-sm bg-[#B89B7A] hover:bg-[#A38A69]"
        >
          <Save className="mr-2 h-4 w-4" />
          Salvar
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
