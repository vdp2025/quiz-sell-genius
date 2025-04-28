
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const VisualEditor: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Editor Visual</h1>
      
      <Tabs defaultValue="result-page" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="result-page">Página de Resultado</TabsTrigger>
          <TabsTrigger value="sales-page">Página de Venda</TabsTrigger>
        </TabsList>
        
        <TabsContent value="result-page">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-center text-gray-500">
              O editor visual da página de resultado está em desenvolvimento. 
              Em breve você poderá personalizar completamente os resultados do quiz.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="sales-page">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-center text-gray-500">
              O editor da página de vendas estará disponível em breve.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
