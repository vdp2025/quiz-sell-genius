import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Copy, Share2, FileJson, ExternalLink, Download } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { generateExportableConfig } from '@/utils/remoteConfig';

interface ConfigExporterProps {
  config: Record<string, any>;
  filename?: string;
}

export const ConfigExporter: React.FC<ConfigExporterProps> = ({ 
  config, 
  filename = 'resultado-config'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  
  const handleExport = () => {
    const jsonContent = JSON.stringify(config, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Configuração exportada',
      description: 'O arquivo JSON foi baixado para o seu computador'
    });
  };
  
  const handleCopyConfig = () => {
    const exportableConfig = generateExportableConfig(config);
    const configString = JSON.stringify(exportableConfig, null, 2);
    
    navigator.clipboard.writeText(configString).then(() => {
      toast({
        title: 'Configuração copiada',
        description: 'O JSON da configuração foi copiado para a área de transferência'
      });
    }).catch(err => {
      console.error('Falha ao copiar configuração:', err);
      toast({
        title: 'Erro ao copiar',
        description: 'Não foi possível copiar a configuração',
        variant: 'destructive'
      });
    });
  };
  
  const handleGenerateShareUrl = () => {
    // Em um ambiente real, você iria hospedar o JSON em um servidor e obter uma URL
    // Para demonstração, vamos criar uma URL com o parâmetro de consulta simulando isso
    const exportableConfig = generateExportableConfig(config);
    const configString = encodeURIComponent(JSON.stringify(exportableConfig));
    
    // URL de demonstração - em produção seria uma URL para um servidor real
    const url = `${window.location.origin}/lovable-editor?config=https://example.com/configs/${configString}`;
    setShareUrl(url);
  };
  
  const handleCopyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast({
        title: 'URL de compartilhamento copiada',
        description: 'O link para compartilhamento foi copiado para a área de transferência'
      });
    }).catch(err => {
      console.error('Falha ao copiar URL:', err);
      toast({
        title: 'Erro ao copiar',
        description: 'Não foi possível copiar a URL de compartilhamento',
        variant: 'destructive'
      });
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="text-sm"
        >
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Exportar Configuração</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm text-muted-foreground">
            Escolha como você quer exportar sua configuração:
          </p>
          
          <div className="flex flex-col space-y-3">
            <Button 
              variant="outline" 
              onClick={handleExport}
              className="justify-start gap-2"
            >
              <FileJson className="w-4 h-4" />
              Baixar como arquivo JSON
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleCopyConfig}
              className="justify-start gap-2"
            >
              <Copy className="w-4 h-4" />
              Copiar configuração JSON
            </Button>
            
            <div className="space-y-2">
              <Button 
                variant="outline" 
                onClick={handleGenerateShareUrl}
                className="w-full justify-start gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Gerar link de compartilhamento
              </Button>
              
              {shareUrl && (
                <div className="flex items-center mt-2 p-2 bg-slate-100 rounded-md text-xs">
                  <code className="flex-1 truncate">{shareUrl}</code>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleCopyShareUrl}
                    className="h-7 w-7 p-0 ml-1"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 