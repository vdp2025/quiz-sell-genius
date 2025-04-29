import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Code } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

interface JsonConfigEditorProps {
  config: any;
  onUpdateConfig: (config: any) => void;
}

export const JsonConfigEditor: React.FC<JsonConfigEditorProps> = ({ config, onUpdateConfig }) => {
  const [open, setOpen] = useState(false);
  const [jsonValue, setJsonValue] = useState('');
  
  const handleOpen = () => {
    setJsonValue(JSON.stringify(config, null, 2));
    setOpen(true);
  };
  
  const handleSave = () => {
    try {
      const parsedConfig = JSON.parse(jsonValue);
      onUpdateConfig(parsedConfig);
      setOpen(false);
      toast({
        title: "Configuração atualizada",
        description: "A configuração JSON foi aplicada com sucesso",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Erro de JSON",
        description: "O JSON fornecido é inválido. Por favor, corrija-o e tente novamente.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handleOpen}
        className="text-sm"
      >
        <Code className="mr-2 h-4 w-4" />
        Editar JSON
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Editar Configuração JSON</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            <Textarea
              value={jsonValue}
              onChange={(e) => setJsonValue(e.target.value)}
              className="font-mono text-sm h-[400px] max-h-[60vh] overflow-auto"
              placeholder="Cole a configuração JSON aqui"
            />
          </div>
          
          <DialogFooter>
            <Button 
              variant="secondary" 
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
            >
              Aplicar Configuração
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
