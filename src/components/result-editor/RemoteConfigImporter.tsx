import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Cloud, Download, Link, RefreshCw } from 'lucide-react';
import { fetchRemoteConfig, validateRemoteConfig, normalizeRemoteConfig } from '@/utils/remoteConfig';
import { toast } from '@/components/ui/use-toast';

interface RemoteConfigImporterProps {
  onImportConfig: (config: any) => void;
}

export const RemoteConfigImporter: React.FC<RemoteConfigImporterProps> = ({ onImportConfig }) => {
  const [remoteUrl, setRemoteUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleFetchConfig = async () => {
    if (!remoteUrl) {
      toast({
        title: "URL inválida",
        description: "Por favor, forneça uma URL válida para importar a configuração",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const fetchedConfig = await fetchRemoteConfig(remoteUrl);
      
      if (!validateRemoteConfig(fetchedConfig)) {
        toast({
          title: "Configuração inválida",
          description: "A configuração remota não possui o formato esperado",
          variant: "destructive"
        });
        return;
      }
      
      const normalizedConfig = normalizeRemoteConfig(fetchedConfig);
      
      onImportConfig(normalizedConfig);
      
      toast({
        title: "Configuração importada",
        description: "A configuração remota foi importada com sucesso",
      });
      
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao importar configuração:', error);
      toast({
        title: "Erro ao importar",
        description: "Não foi possível importar a configuração remota. Verifique a URL e tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Cloud className="w-4 h-4" />
          Importar Remoto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Importar Configuração Remota</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="remote-url" className="text-right col-span-1">
              URL
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Input
                id="remote-url"
                value={remoteUrl}
                onChange={(e) => setRemoteUrl(e.target.value)}
                placeholder="https://exemplo.com/config.json"
                className="col-span-3"
              />
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
            <p>Cole a URL de uma configuração remota para importar.</p>
            <p className="flex items-center">
              <Link className="w-4 h-4 mr-1" />
              Formatos suportados: JSON
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleFetchConfig} disabled={isLoading} className="gap-2">
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Importando...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Importar
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 