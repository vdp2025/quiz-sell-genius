
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Download, Upload, Code } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface JsonConfigEditorProps {
  config: any;
  onUpdate: (newConfig: any) => void;
}

export const JsonConfigEditor: React.FC<JsonConfigEditorProps> = ({
  config,
  onUpdate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const { toast } = useToast();

  const handleOpen = () => {
    setJsonText(JSON.stringify(config, null, 2));
    setIsOpen(true);
  };

  const handleSave = () => {
    try {
      const parsedConfig = JSON.parse(jsonText);
      onUpdate(parsedConfig);
      setIsOpen(false);
      toast({
        title: "Configuração atualizada",
        description: "As alterações foram salvas com sucesso",
      });
    } catch (error) {
      console.error('Error parsing JSON:', error);
      toast({
        title: "Erro ao salvar",
        description: "JSON inválido. Verifique o formato e tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'editor-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const parsedConfig = JSON.parse(content);
          onUpdate(parsedConfig);
          toast({
            title: "Configuração importada",
            description: "O arquivo foi importado com sucesso",
          });
        } catch (error) {
          console.error('Error parsing imported JSON:', error);
          toast({
            title: "Erro ao importar",
            description: "Arquivo JSON inválido",
            variant: "destructive"
          });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleOpen}
        >
          <Code className="w-4 h-4 mr-2" />
          JSON
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => document.getElementById('import-json')?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          Importar
        </Button>
        <input
          id="import-json"
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImport}
        />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Editor JSON</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <Textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
            />
            
            <div className="flex justify-end">
              <Button onClick={handleSave}>
                Salvar Alterações
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
