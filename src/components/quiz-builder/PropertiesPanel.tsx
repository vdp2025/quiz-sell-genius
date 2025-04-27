import React from 'react';
import { QuizComponentData, QuizStage } from '@/types/quizBuilder';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { XCircle, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';
import EnhancedImageProperties from './components/EnhancedImageProperties';
import { Checkbox } from '@/components/ui/checkbox';

interface PropertiesPanelProps {
  component: QuizComponentData | null;
  stage: QuizStage | null;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<QuizComponentData>) => void;
  onUpdateStage: (id: string, updates: Partial<QuizStage>) => void;
  onDelete: (id: string) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  component,
  stage,
  onClose,
  onUpdate,
  onUpdateStage,
  onDelete
}) => {
  if (!component && !stage) {
    return (
      <div className="h-full flex flex-col text-gray-400 p-6 items-center justify-center text-center">
        <Settings className="h-12 w-12 mb-4 text-gray-500" />
        <h3 className="text-lg font-medium mb-2">Nenhum item selecionado</h3>
        <p className="text-gray-400">
          Selecione um componente ou uma etapa para editar suas propriedades
        </p>
      </div>
    );
  }

  if (stage && !component) {
    return (
      <div className="h-full flex flex-col border-l">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-medium">Propriedades da Etapa</h2>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-black" onClick={onClose}>
            <XCircle className="h-5 w-5" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Título da Etapa</Label>
              <Input 
                value={stage.title || ''} 
                onChange={(e) => onUpdateStage(stage.id, { title: e.target.value })}
                placeholder="Título da etapa"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select 
                value={stage.type} 
                onValueChange={(value) => onUpdateStage(stage.id, { type: value as QuizStage['type'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cover">Capa</SelectItem>
                  <SelectItem value="question">Questão</SelectItem>
                  <SelectItem value="result">Resultado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  }

  if (component) {
    return (
      <div className="h-full flex flex-col border-l">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-medium">Propriedades do Componente</h2>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-black" onClick={onClose}>
            <XCircle className="h-5 w-5" />
          </Button>
        </div>
        
        <Tabs defaultValue="content" className="flex-1 flex flex-col">
          <div className="border-b">
            <TabsList className="w-full">
              <TabsTrigger value="content" className="flex-1">
                Conteúdo
              </TabsTrigger>
              <TabsTrigger value="style" className="flex-1">
                Estilo
              </TabsTrigger>
            </TabsList>
          </div>
          
          <ScrollArea className="flex-1">
            <TabsContent value="content" className="mt-0 p-4">
              {component.type === 'header' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Título Principal</Label>
                    <Input 
                      value={component.data.title || ''} 
                      onChange={(e) => onUpdate(component.id, { 
                        data: { ...component.data, title: e.target.value } 
                      })}
                      placeholder="Título principal"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Subtítulo</Label>
                    <Input 
                      value={component.data.subtitle || ''} 
                      onChange={(e) => onUpdate(component.id, { 
                        data: { ...component.data, subtitle: e.target.value } 
                      })}
                      placeholder="Subtítulo opcional"
                    />
                  </div>
                </div>
              )}
              
              {component.type === 'headline' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Texto do Título</Label>
                    <Input 
                      value={component.data.title || ''} 
                      onChange={(e) => onUpdate(component.id, { 
                        data: { ...component.data, title: e.target.value } 
                      })}
                      placeholder="Título da seção"
                    />
                  </div>
                </div>
              )}
              
              {component.type === 'text' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Conteúdo do Texto</Label>
                    <Textarea 
                      value={component.data.text || ''} 
                      onChange={(e) => onUpdate(component.id, { 
                        data: { ...component.data, text: e.target.value } 
                      })}
                      className="min-h-[200px]"
                      placeholder="Digite seu texto aqui"
                    />
                  </div>
                </div>
              )}
              
              {component.type === 'image' && (
                <EnhancedImageProperties 
                  data={component.data}
                  onUpdate={(data) => onUpdate(component.id, { data })}
                />
              )}
              
              {(component.type === 'multipleChoice' || component.type === 'singleChoice') && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Pergunta</Label>
                    <Input 
                      value={component.data.question || ''} 
                      onChange={(e) => onUpdate(component.id, { 
                        data: { ...component.data, question: e.target.value } 
                      })}
                      placeholder="Digite a pergunta"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Opções</Label>
                    {component.data.options && component.data.options.map((option, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input 
                          value={option} 
                          onChange={(e) => {
                            const newOptions = [...(component.data.options || [])];
                            newOptions[index] = e.target.value;
                            onUpdate(component.id, { 
                              data: { ...component.data, options: newOptions } 
                            });
                          }}
                          placeholder={`Opção ${index + 1}`}
                        />
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => {
                            const newOptions = [...(component.data.options || [])];
                            newOptions.splice(index, 1);
                            onUpdate(component.id, { 
                              data: { ...component.data, options: newOptions } 
                            });
                          }}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      onClick={() => {
                        const newOptions = [...(component.data.options || []), ''];
                        onUpdate(component.id, { 
                          data: { ...component.data, options: newOptions } 
                        });
                      }}
                      className="w-full mt-2 bg-[#B89B7A] hover:bg-[#A38A69] text-white"
                    >
                      Adicionar Opção
                    </Button>
                  </div>
                </div>
              )}
              
              {component.type === 'stageResult' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Título Principal</Label>
                    <Input 
                      value={component.data.title || ''} 
                      onChange={(e) => onUpdate(component.id, { 
                        data: { ...component.data, title: e.target.value } 
                      })}
                      placeholder="Seu Resultado de Estilo Pessoal"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Subtítulo</Label>
                    <Input 
                      value={component.data.subtitle || ''} 
                      onChange={(e) => onUpdate(component.id, { 
                        data: { ...component.data, subtitle: e.target.value } 
                      })}
                      placeholder="Baseado nas suas escolhas, calculamos seu estilo predominante"
                    />
                  </div>

                  <Card className="p-4">
                    <h3 className="font-medium mb-3">Configuração do Resultado</h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Título do Estilo Principal</Label>
                        <Input 
                          value={component.data.primaryStyleTitle || ''} 
                          onChange={(e) => onUpdate(component.id, { 
                            data: { ...component.data, primaryStyleTitle: e.target.value } 
                          })}
                          placeholder="Seu Estilo Predominante"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="showSecondaryStyles"
                          checked={component.data.showSecondaryStyles !== false}
                          onCheckedChange={(checked) => 
                            onUpdate(component.id, { 
                              data: { ...component.data, showSecondaryStyles: !!checked }
                            })
                          }
                        />
                        <Label htmlFor="showSecondaryStyles">Mostrar estilos secundários</Label>
                      </div>
                      
                      {component.data.showSecondaryStyles !== false && (
                        <div className="space-y-2">
                          <Label>Título dos Estilos Secundários</Label>
                          <Input 
                            value={component.data.secondaryStylesTitle || ''} 
                            onChange={(e) => onUpdate(component.id, { 
                              data: { ...component.data, secondaryStylesTitle: e.target.value } 
                            })}
                            placeholder="Seus Estilos Complementares"
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="showPercentages"
                          checked={component.data.showPercentages !== false}
                          onCheckedChange={(checked) => 
                            onUpdate(component.id, { 
                              data: { ...component.data, showPercentages: !!checked }
                            })
                          }
                        />
                        <Label htmlFor="showPercentages">Mostrar porcentagens</Label>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-medium mb-3">Configuração da Oferta</h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Título da Oferta</Label>
                        <Input 
                          value={component.data.offerTitle || ''} 
                          onChange={(e) => onUpdate(component.id, { 
                            data: { ...component.data, offerTitle: e.target.value } 
                          })}
                          placeholder="Conheça o Guia Completo de Estilo"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>URL da Imagem da Oferta</Label>
                        <Input 
                          value={component.data.offerImageUrl || ''} 
                          onChange={(e) => onUpdate(component.id, { 
                            data: { ...component.data, offerImageUrl: e.target.value } 
                          })}
                          placeholder="https://exemplo.com/imagem.jpg"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>URL da Imagem do Autor</Label>
                        <Input 
                          value={component.data.authorImageUrl || ''} 
                          onChange={(e) => onUpdate(component.id, { 
                            data: { ...component.data, authorImageUrl: e.target.value } 
                          })}
                          placeholder="https://exemplo.com/autor.jpg"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Título dos Benefícios</Label>
                        <Input 
                          value={component.data.benefitsTitle || ''} 
                          onChange={(e) => onUpdate(component.id, { 
                            data: { ...component.data, benefitsTitle: e.target.value } 
                          })}
                          placeholder="O que você vai encontrar no guia:"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Benefícios</Label>
                        {(component.data.benefits || [
                          'Análise completa do seu estilo pessoal',
                          'Guia de combinações perfeitas para seu tipo',
                          'Dicas de peças essenciais para seu guarda-roupa',
                          'Como valorizar seus pontos fortes e criar seu estilo único'
                        ]).map((benefit, index) => (
                          <div key={index} className="flex gap-2 mb-2">
                            <Input 
                              value={benefit} 
                              onChange={(e) => {
                                const newBenefits = [...(component.data.benefits || [
                                  'Análise completa do seu estilo pessoal',
                                  'Guia de combinações perfeitas para seu tipo',
                                  'Dicas de peças essenciais para seu guarda-roupa',
                                  'Como valorizar seus pontos fortes e criar seu estilo único'
                                ])];
                                newBenefits[index] = e.target.value;
                                onUpdate(component.id, { 
                                  data: { ...component.data, benefits: newBenefits } 
                                });
                              }}
                              placeholder={`Benefício ${index + 1}`}
                            />
                            <Button 
                              variant="destructive" 
                              size="icon"
                              onClick={() => {
                                const newBenefits = [...(component.data.benefits || [
                                  'Análise completa do seu estilo pessoal',
                                  'Guia de combinações perfeitas para seu tipo',
                                  'Dicas de peças essenciais para seu guarda-roupa',
                                  'Como valorizar seus pontos fortes e criar seu estilo único'
                                ])];
                                newBenefits.splice(index, 1);
                                onUpdate(component.id, { 
                                  data: { ...component.data, benefits: newBenefits } 
                                });
                              }}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          onClick={() => {
                            const newBenefits = [...(component.data.benefits || [
                              'Análise completa do seu estilo pessoal',
                              'Guia de combinações perfeitas para seu tipo',
                              'Dicas de peças essenciais para seu guarda-roupa',
                              'Como valorizar seus pontos fortes e criar seu estilo único'
                            ]), ''];
                            onUpdate(component.id, { 
                              data: { ...component.data, benefits: newBenefits } 
                            });
                          }}
                          className="w-full mt-2 bg-[#B89B7A] hover:bg-[#A38A69] text-white"
                        >
                          Adicionar Benefício
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Texto do Botão de Call to Action</Label>
                        <Input 
                          value={component.data.callToActionText || ''} 
                          onChange={(e) => onUpdate(component.id, { 
                            data: { ...component.data, callToActionText: e.target.value } 
                          })}
                          placeholder="Conhecer o Guia Completo"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>URL do Call to Action</Label>
                        <Input 
                          value={component.data.callToActionUrl || ''} 
                          onChange={(e) => onUpdate(component.id, { 
                            data: { ...component.data, callToActionUrl: e.target.value } 
                          })}
                          placeholder="https://exemplo.com/guia"
                        />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-medium mb-3">Cores</h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Cor de Destaque</Label>
                        <div className="flex gap-2">
                          <Input 
                            type="color"
                            value={component.data.accentColor || '#B89B7A'} 
                            onChange={(e) => onUpdate(component.id, { 
                              data: { ...component.data, accentColor: e.target.value } 
                            })}
                            className="w-12 p-1 h-10"
                          />
                          <Input 
                            type="text"
                            value={component.data.accentColor || '#B89B7A'} 
                            onChange={(e) => onUpdate(component.id, { 
                              data: { ...component.data, accentColor: e.target.value } 
                            })}
                            placeholder="#B89B7A"
                            className="flex-1"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Cor de Fundo</Label>
                        <div className="flex gap-2">
                          <Input 
                            type="color"
                            value={component.style?.backgroundColor || '#FAF9F7'} 
                            onChange={(e) => onUpdate(component.id, { 
                              style: { ...component.style, backgroundColor: e.target.value } 
                            })}
                            className="w-12 p-1 h-10"
                          />
                          <Input 
                            type="text"
                            value={component.style?.backgroundColor || '#FAF9F7'} 
                            onChange={(e) => onUpdate(component.id, { 
                              style: { ...component.style, backgroundColor: e.target.value } 
                            })}
                            placeholder="#FAF9F7"
                            className="flex-1"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Cor do Texto</Label>
                        <div className="flex gap-2">
                          <Input 
                            type="color"
                            value={component.style?.textColor || '#432818'} 
                            onChange={(e) => onUpdate(component.id, { 
                              style: { ...component.style, textColor: e.target.value } 
                            })}
                            className="w-12 p-1 h-10"
                          />
                          <Input 
                            type="text"
                            value={component.style?.textColor || '#432818'} 
                            onChange={(e) => onUpdate(component.id, { 
                              style: { ...component.style, textColor: e.target.value } 
                            })}
                            placeholder="#432818"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
              
              <div className="mt-6 pt-4 border-t">
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={() => onDelete(component.id)}
                >
                  Excluir Componente
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="style" className="mt-0 p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Cor de Fundo</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="color"
                      value={component.style?.backgroundColor || '#ffffff'} 
                      onChange={(e) => onUpdate(component.id, { 
                        style: { ...component.style, backgroundColor: e.target.value } 
                      })}
                      className="w-12 h-10 p-1"
                    />
                    <Input 
                      type="text"
                      value={component.style?.backgroundColor || ''} 
                      onChange={(e) => onUpdate(component.id, { 
                        style: { ...component.style, backgroundColor: e.target.value } 
                      })}
                      className="flex-1"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Cor do Texto</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="color"
                      value={component.style?.textColor || '#000000'} 
                      onChange={(e) => onUpdate(component.id, { 
                        style: { ...component.style, textColor: e.target.value } 
                      })}
                      className="w-12 h-10 p-1"
                    />
                    <Input 
                      type="text"
                      value={component.style?.textColor || ''} 
                      onChange={(e) => onUpdate(component.id, { 
                        style: { ...component.style, textColor: e.target.value } 
                      })}
                      className="flex-1"
                      placeholder="#000000"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Arredondamento de Bordas</Label>
                  <Select 
                    value={component.style?.borderRadius || 'none'} 
                    onValueChange={(value) => onUpdate(component.id, { 
                      style: { ...component.style, borderRadius: value } 
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sem Arredondamento</SelectItem>
                      <SelectItem value="sm">Pequeno</SelectItem>
                      <SelectItem value="md">Médio</SelectItem>
                      <SelectItem value="lg">Grande</SelectItem>
                      <SelectItem value="full">Completo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Padding Vertical</Label>
                  <Select 
                    value={component.style?.paddingY || '4'} 
                    onValueChange={(value) => onUpdate(component.id, { 
                      style: { ...component.style, paddingY: value } 
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Nenhum</SelectItem>
                      <SelectItem value="2">Extra Pequeno (0.5rem)</SelectItem>
                      <SelectItem value="4">Pequeno (1rem)</SelectItem>
                      <SelectItem value="6">Médio (1.5rem)</SelectItem>
                      <SelectItem value="8">Grande (2rem)</SelectItem>
                      <SelectItem value="12">Extra Grande (3rem)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Padding Horizontal</Label>
                  <Select 
                    value={component.style?.paddingX || '4'} 
                    onValueChange={(value) => onUpdate(component.id, { 
                      style: { ...component.style, paddingX: value } 
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Nenhum</SelectItem>
                      <SelectItem value="2">Extra Pequeno (0.5rem)</SelectItem>
                      <SelectItem value="4">Pequeno (1rem)</SelectItem>
                      <SelectItem value="6">Médio (1.5rem)</SelectItem>
                      <SelectItem value="8">Grande (2rem)</SelectItem>
                      <SelectItem value="12">Extra Grande (3rem)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    );
  }

  return null;
};
