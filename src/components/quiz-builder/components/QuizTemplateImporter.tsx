
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { styleQuizTemplate } from '@/services/templates/styleQuizTemplate';
import { styleQuizTemplate2 } from '@/services/templates/styleQuizTemplate2';
import { QuizBuilderState } from '@/types/quizBuilder';
import { QuizTemplate } from '@/types/quizTemplate';
import { createBuilderStateFromQuiz } from '@/services/quizBuilderService';
import { quizQuestions } from '@/data/quizQuestions'; 
import { strategicQuestions } from '@/data/strategicQuestions';

interface QuizTemplateImporterProps {
  isOpen: boolean;
  onClose: () => void;
  onImportTemplate: (template: QuizBuilderState) => void;
}

interface TemplateItem {
  id: string;
  title: string;
  description: string;
  image: string;
  template: QuizTemplate | QuizBuilderState;
  type: 'quizTemplate' | 'builderState';
}

interface ImportSourceOption {
  id: string;
  name: string;
  description: string;
  image: string;
}

const QuizTemplateImporter: React.FC<QuizTemplateImporterProps> = ({
  isOpen,
  onClose,
  onImportTemplate
}) => {
  const [activeTab, setActiveTab] = useState<string>('templates');
  
  const templates: TemplateItem[] = [
    {
      id: 'style-quiz-1',
      title: 'Quiz de Estilo Pessoal',
      description: 'Template padrão com perguntas sobre preferências de estilo e personalidade.',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp',
      template: styleQuizTemplate,
      type: 'quizTemplate'
    },
    {
      id: 'style-quiz-2',
      title: 'Quiz de Estilo Avançado',
      description: 'Template com questões de múltipla escolha e imagens para análise de estilo detalhada.',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/5_dhrgpf.webp',
      template: styleQuizTemplate2,
      type: 'builderState'
    }
  ];
  
  const importSources: ImportSourceOption[] = [
    {
      id: 'current-quiz',
      name: 'Quiz Atual',
      description: 'Importar o quiz em execução no site atual com todas as perguntas e configurações.',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp'
    },
    {
      id: 'result-page',
      name: 'Página de Resultados',
      description: 'Importar configurações da página de resultados atual, incluindo layout e componentes.',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp'
    }
  ];

  const handleImportTemplate = (templateItem: TemplateItem) => {
    let builderState: QuizBuilderState;
    
    if (templateItem.type === 'quizTemplate') {
      // Convert QuizTemplate to QuizBuilderState
      const quizTemplate = templateItem.template as QuizTemplate;
      builderState = createBuilderStateFromQuiz(
        quizTemplate.questions,
        quizTemplate.name,
        quizTemplate.description,
        `Resultado de ${quizTemplate.name}`
      );
    } else {
      // It's already a QuizBuilderState
      builderState = templateItem.template as QuizBuilderState;
    }
    
    onImportTemplate(builderState);
    onClose();
  };
  
  const handleImportExistingQuiz = (sourceId: string) => {
    let builderState: QuizBuilderState;
    
    if (sourceId === 'current-quiz') {
      // Import from the current live quiz
      builderState = createBuilderStateFromQuiz(
        [...quizQuestions, ...strategicQuestions],
        'Quiz de Estilo Pessoal',
        'Descubra seu estilo predominante respondendo às perguntas a seguir',
        'Seu Resultado de Estilo Pessoal'
      );
      
      // Try to load existing results from localStorage
      try {
        const savedResultConfig = localStorage.getItem('quiz_result_config_Elegante');
        if (savedResultConfig) {
          console.log('Found existing result configuration, integrating with builder state');
          // In a real implementation, we would merge the result config with the builder state
        }
      } catch (error) {
        console.error('Error loading saved result config:', error);
      }
    } else {
      // Import from result page
      // This would typically load the existing result page configuration
      // and convert it to builder components
      builderState = createResultPageBuilderState();
    }
    
    onImportTemplate(builderState);
    onClose();
  };
  
  // Helper function to create a builder state from result page
  const createResultPageBuilderState = (): QuizBuilderState => {
    // In a real implementation, this would load configuration from storage or a service
    // For now, we'll create a simplified version
    const stageId = `stage_${Date.now()}`;
    const componentId = `component_${Date.now()}`;
    
    return {
      stages: [
        {
          id: stageId,
          title: 'Resultado',
          order: 0,
          type: 'result'
        }
      ],
      components: [
        {
          id: componentId,
          type: 'stageResult',
          order: 0,
          stageId: stageId,
          data: {
            stageTitle: 'Resultado do Quiz',
            resultLayout: 'classic',
            primaryStyleTitle: 'Seu Estilo Predominante',
            secondaryStylesTitle: 'Estilos Complementares',
            showPercentages: true,
            showDescriptions: true,
            callToActionText: 'Conhecer o Guia Completo',
            callToActionUrl: '#',
            accentColor: '#B89B7A'
          }
        }
      ]
    };
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair text-[#432818]">Importar Quiz</DialogTitle>
          <DialogDescription>
            Escolha um template pré-configurado ou importe de uma fonte existente.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="existing">Quiz Existente</TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              {templates.map((template) => (
                <Card key={template.id} className="overflow-hidden border border-[#B89B7A]/30 hover:border-[#B89B7A] transition-all cursor-pointer">
                  <div className="w-full h-48 overflow-hidden">
                    <img src={template.image} alt={template.title} className="w-full h-full object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle className="font-playfair text-[#432818]">{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button 
                      className="w-full bg-[#B89B7A] hover:bg-[#A38A69]"
                      onClick={() => handleImportTemplate(template)}
                    >
                      Selecionar Template
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="existing" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              {importSources.map((source) => (
                <Card key={source.id} className="overflow-hidden border border-[#B89B7A]/30 hover:border-[#B89B7A] transition-all cursor-pointer">
                  <div className="w-full h-48 overflow-hidden">
                    <img src={source.image} alt={source.name} className="w-full h-full object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle className="font-playfair text-[#432818]">{source.name}</CardTitle>
                    <CardDescription>{source.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button 
                      className="w-full bg-[#B89B7A] hover:bg-[#A38A69]"
                      onClick={() => handleImportExistingQuiz(source.id)}
                    >
                      Importar {source.name}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default QuizTemplateImporter;
