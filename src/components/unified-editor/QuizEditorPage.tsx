import * as React from 'react';
import { useEffect, useState } from 'react';
import { LiveEditor } from './components/LiveEditor';
import { EditorProvider } from '@/context/EditorContext';
import { useEventTracking } from '@/hooks/useEventTracking';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetricsPanel } from '@/components/metrics/MetricsPanel';
import { Lightbulb, Gauge, Save, Edit, Eye, File } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export function QuizEditorPage() {
  const [activeTab, setActiveTab] = useState<string>('editor');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const eventTracking = useEventTracking();
  
  // Registrar visualização da página
  useEffect(() => {
    eventTracking.trackPageView();
  }, [eventTracking]);
  
  // Simular salvamento
  const handleSave = async () => {
    // Aqui seria implementada a lógica real de salvamento
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setLastSaved(new Date());
    toast({
      title: "Alterações salvas",
      description: "Todas as alterações foram salvas com sucesso.",
      duration: 3000
    });
  };
  
  return (
    <div className="flex flex-col h-screen">
      {/* Cabeçalho */}
      <header className="border-b bg-white p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Edit className="w-5 h-5 text-blue-500 mr-2" />
            <h1 className="text-lg font-medium">Quiz Editor</h1>
          </div>
          
          <div className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
            {lastSaved 
              ? `Última alteração: ${lastSaved.toLocaleTimeString()}` 
              : 'Não salvo'}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.open('/preview', '_blank')}>
            <Eye className="w-4 h-4 mr-1" />
            Visualizar
          </Button>
          
          <Button variant="default" size="sm" onClick={handleSave}>
            <Save className="w-4 h-4 mr-1" />
            Salvar
          </Button>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Barra lateral */}
        <div className="w-16 border-r bg-gray-50 flex flex-col items-center py-4">
          <Tabs 
            defaultValue="editor" 
            value={activeTab} 
            onValueChange={setActiveTab}
            orientation="vertical" 
            className="h-full flex flex-col items-center"
          >
            <TabsList className="flex flex-col bg-transparent gap-2">
              <TabsTrigger value="editor" className="w-10 h-10 rounded-full p-0" title="Editor">
                <Edit className="w-5 h-5" />
              </TabsTrigger>
              
              <TabsTrigger value="metrics" className="w-10 h-10 rounded-full p-0" title="Métricas">
                <Gauge className="w-5 h-5" />
              </TabsTrigger>
              
              <TabsTrigger value="templates" className="w-10 h-10 rounded-full p-0" title="Templates">
                <File className="w-5 h-5" />
              </TabsTrigger>
              
              <TabsTrigger value="help" className="w-10 h-10 rounded-full p-0" title="Ajuda">
                <Lightbulb className="w-5 h-5" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Conteúdo principal */}
        <div className="flex-1 overflow-hidden">
          <TabsContent value="editor" className="h-full m-0 p-0">
            <EditorProvider>
              <LiveEditor />
            </EditorProvider>
          </TabsContent>
          
          <TabsContent value="metrics" className="h-full m-0 p-0">
            <MetricsPanel />
          </TabsContent>
          
          <TabsContent value="templates" className="h-full m-0 p-0">
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-md p-4">
                <File className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-medium mb-2">Templates</h2>
                <p className="text-gray-500 mb-4">
                  Aqui você poderia escolher entre diferentes templates para o seu quiz.
                </p>
                <Button>Explorar templates</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="help" className="h-full m-0 p-0">
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-md p-4">
                <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-medium mb-2">Ajuda e dicas</h2>
                <p className="text-gray-500 mb-4">
                  Aprenda como utilizar o editor e otimizar seu quiz para obter melhores resultados.
                </p>
                <Button variant="outline">Ver tutoriais</Button>
              </div>
            </div>
          </TabsContent>
        </div>
      </div>
    </div>
  );
} 