
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const QuizAdminPanel: React.FC = () => {
  return (
    <div className="p-6 bg-[#FAF9F7]">
      <h1 className="text-2xl font-bold text-[#432818] mb-6">Construtor de Quiz</h1>
      
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Editor de Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="questions">
            <TabsList className="mb-4">
              <TabsTrigger value="questions">Perguntas</TabsTrigger>
              <TabsTrigger value="appearance">Aparência</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>
            <TabsContent value="questions">
              <p className="text-gray-600 mb-4">
                Esta seção permite que você configure as perguntas do seu quiz.
              </p>
              {/* Quiz Question Editor would go here */}
              <div className="p-4 bg-gray-100 text-center rounded-lg">
                Editor de Perguntas (Em desenvolvimento)
              </div>
            </TabsContent>
            <TabsContent value="appearance">
              <p className="text-gray-600 mb-4">
                Personalize a aparência do seu quiz.
              </p>
              {/* Appearance Editor would go here */}
              <div className="p-4 bg-gray-100 text-center rounded-lg">
                Editor de Aparência (Em desenvolvimento)
              </div>
            </TabsContent>
            <TabsContent value="settings">
              <p className="text-gray-600 mb-4">
                Configure as opções gerais do seu quiz.
              </p>
              {/* Settings Editor would go here */}
              <div className="p-4 bg-gray-100 text-center rounded-lg">
                Configurações (Em desenvolvimento)
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizAdminPanel;
