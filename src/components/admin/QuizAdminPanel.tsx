
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const QuizAdminPanel: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Construtor de Quiz</h1>
      
      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="questions">Perguntas</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
          <TabsTrigger value="results">Resultados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="questions">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-center text-gray-500">
              O editor de quiz está em desenvolvimento. Em breve você poderá criar perguntas personalizadas.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-center text-gray-500">
              As configurações de quiz estarão disponíveis em breve.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="results">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-center text-gray-500">
              O editor de resultados está em desenvolvimento.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuizAdminPanel;
