import React, { useState, useEffect } from 'react';
import { Plus, Save, Settings, Trash, ArrowUp, ArrowDown, Eye, EyeOff } from 'lucide-react';
import { useQuizBuilder } from '@/hooks/useQuizBuilder';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { QuizComponentType, QuizStage, QuizComponentData } from '@/types/quizBuilder';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

/**
 * Um construtor de quiz simplificado inspirado no Typeform
 */
export function QuizSimpleBuilder() {
  const [activeTab, setActiveTab] = useState('questions');
  const [previewMode, setPreviewMode] = useState(false);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  
  const { 
    components,
    stages,
    activeStageId,
    addComponent,
    updateComponent,
    deleteComponent,
    moveComponent,
    addStage,
    updateStage,
    deleteStage,
    moveStage,
    setActiveStage,
    saveCurrentState,
    loading
  } = useQuizBuilder();

  useEffect(() => {
    // Se não houver nenhum estágio, criar um inicial
    if (stages.length === 0) {
      const newStageId = addStage('question' as any);
      setActiveStage(newStageId);
    } else if (!activeStageId && stages.length > 0) {
      setActiveStage(stages[0].id);
    }
  }, [stages, activeStageId]);

  const handleAddQuestion = () => {
    if (!activeStageId) return;
    
    // Adiciona uma pergunta ao estágio ativo
    const componentId = addComponent('question', activeStageId);
    setExpandedQuestionId(componentId);
    
    toast({
      title: "Pergunta adicionada",
      description: "Uma nova pergunta foi adicionada ao quiz.",
    });
  };

  const handleSave = () => {
    const success = saveCurrentState();
    if (success) {
      toast({
        title: "Quiz salvo",
        description: "Todas as alterações foram salvas com sucesso!",
      });
    }
  };

  const handleMoveQuestion = (id: string, direction: 'up' | 'down') => {
    const stageComponents = components.filter(c => c.stageId === activeStageId);
    const currentIndex = stageComponents.findIndex(c => c.id === id);
    
    if (direction === 'up' && currentIndex > 0) {
      const targetId = stageComponents[currentIndex - 1].id;
      moveComponent(id, targetId);
    } else if (direction === 'down' && currentIndex < stageComponents.length - 1) {
      const targetId = stageComponents[currentIndex + 1].id;
      moveComponent(targetId, id);
    }
  };

  // Componentes ativos do estágio atual
  const activeComponents = activeStageId 
    ? components
        .filter(c => c.stageId === activeStageId)
        .sort((a, b) => a.order - b.order)
    : [];

  // Renderiza uma pergunta no modo de edição
  const renderQuestionEditor = (component: QuizComponentData) => {
    const isExpanded = expandedQuestionId === component.id;
    
    return (
      <Card 
        key={component.id} 
        className={`mb-4 relative ${isExpanded ? 'border-blue-400 shadow-md' : 'border-gray-200'}`}
      >
        <div 
          className="p-4 cursor-pointer" 
          onClick={() => setExpandedQuestionId(isExpanded ? null : component.id)}
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium truncate">
              {component.data.question || 'Nova pergunta'}
            </h3>
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleMoveQuestion(component.id, 'up');
                }}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleMoveQuestion(component.id, 'down');
                }}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-red-500 hover:text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteComponent(component.id);
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {isExpanded && (
          <div className="p-4 border-t">
            <div className="space-y-4">
              <div>
                <Label>Pergunta</Label>
                <Textarea 
                  value={component.data.question || ''} 
                  onChange={(e) => updateComponent(component.id, { 
                    data: { ...component.data, question: e.target.value } 
                  })}
                  placeholder="Digite sua pergunta aqui..."
                  className="w-full mt-1"
                />
              </div>
              
              <div>
                <Label>Tipo de resposta</Label>
                <Select 
                  value={component.data.displayType || 'text'} 
                  onValueChange={(value: 'text' | 'image' | 'both') => updateComponent(component.id, { 
                    data: { ...component.data, displayType: value } 
                  })}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Escolha um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Apenas texto</SelectItem>
                    <SelectItem value="image">Apenas imagem</SelectItem>
                    <SelectItem value="both">Texto e imagem</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Número de opções selecionáveis</Label>
                <Select 
                  value={String(component.data.multiSelect || 1)} 
                  onValueChange={(value) => updateComponent(component.id, { 
                    data: { ...component.data, multiSelect: parseInt(value) } 
                  })}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Quantidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 opção</SelectItem>
                    <SelectItem value="2">2 opções</SelectItem>
                    <SelectItem value="3">3 opções</SelectItem>
                    <SelectItem value="4">4 opções</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="options">
                  <AccordionTrigger>Opções</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      {(component.data.options || ['', '', '', '']).slice(0, 6).map((option, index) => (
                        <div key={index} className="flex gap-2">
                          <Input 
                            value={option || ''} 
                            onChange={(e) => {
                              const newOptions = [...(component.data.options || ['', '', '', ''])];
                              newOptions[index] = e.target.value;
                              updateComponent(component.id, { 
                                data: { ...component.data, options: newOptions } 
                              });
                            }}
                            placeholder={`Opção ${index + 1}`}
                          />
                          
                          {component.data.displayType !== 'text' && (
                            <Input 
                              value={(component.data.optionImages || [])[index] || ''} 
                              onChange={(e) => {
                                const newOptionImages = [...(component.data.optionImages || [])];
                                newOptionImages[index] = e.target.value;
                                updateComponent(component.id, { 
                                  data: { ...component.data, optionImages: newOptionImages } 
                                });
                              }}
                              placeholder="URL da imagem"
                            />
                          )}
                        </div>
                      ))}
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2"
                        onClick={() => {
                          const newOptions = [...(component.data.options || []), ''];
                          updateComponent(component.id, { 
                            data: { ...component.data, options: newOptions } 
                          });
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Adicionar opção
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="advanced">
                  <AccordionTrigger>Configurações avançadas</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Pergunta Obrigatória</Label>
                        <Switch 
                          checked={component.data.required || false}
                          onCheckedChange={(checked) => updateComponent(component.id, { 
                            data: { ...component.data, required: checked } 
                          })}
                        />
                      </div>
                      
                      <div>
                        <Label>Categoria da Pergunta</Label>
                        <Input 
                          value={component.data.category || ''} 
                          onChange={(e) => updateComponent(component.id, { 
                            data: { ...component.data, category: e.target.value } 
                          })}
                          placeholder="Ex: Estilo Pessoal, Cores, etc."
                          className="w-full mt-1"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        )}
      </Card>
    );
  };

  // Renderiza uma pergunta no modo de visualização
  const renderQuestionPreview = (component: QuizComponentData) => {
    return (
      <Card key={component.id} className="mb-4 p-5">
        <h3 className="text-xl font-medium mb-4">{component.data.question || 'Nova pergunta'}</h3>
        
        {component.data.displayType !== 'text' && component.data.optionImages && component.data.optionImages.length > 0 && (
          <div className={`grid grid-cols-${Math.min(component.data.options?.length || 2, 3)} gap-4 mb-4`}>
            {component.data.optionImages.map((imageUrl, index) => (
              imageUrl && (
                <div key={index} className="relative aspect-video overflow-hidden rounded-md border border-gray-200">
                  <img 
                    src={imageUrl} 
                    alt={component.data.options?.[index] || `Opção ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )
            ))}
          </div>
        )}
        
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-3`}>
          {(component.data.options || ['', '', '', '']).map((option, index) => (
            option && (
              <div 
                key={index} 
                className="p-3 border border-gray-200 rounded-md hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
              >
                {option}
              </div>
            )
          ))}
        </div>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <header className="bg-white border-b p-4">
        <div className="container max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Quiz Builder Simplificado</h1>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
            >
              {previewMode ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
              {previewMode ? 'Editar' : 'Visualizar'}
            </Button>
            
            <Button 
              variant="default" 
              size="sm"
              onClick={handleSave}
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Quiz
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container max-w-5xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="questions">Perguntas</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="questions">
            {previewMode ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Pré-visualização do Quiz</h2>
                
                {activeComponents.length === 0 ? (
                  <div className="text-center p-12 border-2 border-dashed border-gray-200 rounded-md">
                    <p className="text-gray-500">Nenhuma pergunta adicionada.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setPreviewMode(false)}
                    >
                      Voltar para o editor
                    </Button>
                  </div>
                ) : (
                  activeComponents.map(component => renderQuestionPreview(component))
                )}
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Perguntas do Quiz</h2>
                  <Button onClick={handleAddQuestion}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar pergunta
                  </Button>
                </div>
                
                {activeComponents.length === 0 ? (
                  <div className="text-center p-12 border-2 border-dashed border-gray-200 rounded-md">
                    <p className="text-gray-500">Nenhuma pergunta adicionada ainda.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={handleAddQuestion}
                    >
                      Adicionar primeira pergunta
                    </Button>
                  </div>
                ) : (
                  <div>
                    {activeComponents.map(component => renderQuestionEditor(component))}
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Configurações do Quiz</h2>
              
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Personalização</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label>Nome do Quiz</Label>
                    <Input 
                      placeholder="Ex: Quiz de Estilo Pessoal" 
                      value={stages[0]?.title || ''}
                      onChange={(e) => {
                        if (stages[0]) {
                          updateStage(stages[0].id, { title: e.target.value });
                        }
                      }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Cor Primária</Label>
                      <Input 
                        type="color" 
                        className="h-10 w-full"
                        value="#B89B7A"
                      />
                    </div>
                    <div>
                      <Label>Cor Secundária</Label>
                      <Input 
                        type="color" 
                        className="h-10 w-full"
                        value="#432818"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default QuizSimpleBuilder; 