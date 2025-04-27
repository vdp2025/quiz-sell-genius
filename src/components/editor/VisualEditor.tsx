
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const VisualEditor = () => {
  const [activeTab, setActiveTab] = useState('quiz');

  return (
    <div className="min-h-screen bg-[#FAF9F7] p-4">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-6">
          <div className="p-4 flex justify-between items-center border-b">
            <h1 className="text-2xl font-bold text-[#432818]">Editor Visual Unificado</h1>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Salvar
              </Button>
              <Button size="sm" className="bg-[#9b87f5]">
                Publicar
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="quiz" value={activeTab} onValueChange={setActiveTab} className="p-4">
            <TabsList className="mb-4">
              <TabsTrigger value="quiz">Editor de Quiz</TabsTrigger>
              <TabsTrigger value="result">Página de Resultado</TabsTrigger>
              <TabsTrigger value="sales">Página de Vendas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="quiz">
              <div className="h-[500px] bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Editor de Quiz será implementado aqui.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="result">
              <div className="h-[500px] bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Editor de Página de Resultado será implementado aqui.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="sales">
              <div className="h-[500px] bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Editor de Página de Vendas será implementado aqui.</p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default VisualEditor;
