import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ResultPageVisualEditor } from '@/components/result-editor/ResultPageVisualEditor';
import { TemplateList } from '@/components/editor/templates/TemplateList';
import { Button } from '@/components/ui/button';
import { defaultResultTemplate } from '@/config/resultPageTemplates';
import { createOfferConfig } from '@/utils/config/offerDefaults';
import { fetchRemoteConfig, validateRemoteConfig, normalizeRemoteConfig } from '@/utils/remoteConfig';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export const LovableEditorPage = () => {
  const [showTemplates, setShowTemplates] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialConfig, setInitialConfig] = useState<any>(null);
  const { style } = useParams<{ style?: string }>();
  const location = useLocation();
  
  const styleCategory = (style as "Natural" | "Clássico" | "Contemporâneo" | "Elegante" | "Romântico" | "Sexy" | "Dramático" | "Criativo") || 'Natural';
  
  const selectedStyle = {
    category: styleCategory,
    score: 100,
    percentage: 100
  };
  
  // Configuração inicial baseada no modelo Lovable
  const defaultLovableConfig = {
    styleType: styleCategory,
    header: {
      ...defaultResultTemplate.header,
      visible: true,
      style: {
        ...defaultResultTemplate.header.style,
        fontFamily: 'Playfair Display, serif',
        padding: '20px 0',
        backgroundColor: '#fffaf7',
        borderRadius: '0'
      },
      content: {
        title: `Seu Estilo é ${styleCategory}`,
        subtitle: 'Descubra como aplicar seu estilo no dia a dia'
      }
    },
    mainContent: {
      ...defaultResultTemplate.mainContent,
      visible: true,
      style: {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        border: '1px solid rgba(184, 155, 122, 0.2)'
      }
    },
    secondaryStyles: {
      visible: true,
      content: {
        title: 'Seus Estilos Complementares',
        text: 'Saiba como combinar seu estilo principal com estas influências adicionais'
      },
      style: {
        padding: '16px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        border: '1px solid rgba(184, 155, 122, 0.1)'
      }
    },
    offer: {
      hero: {
        visible: true,
        content: {
          title: 'O Guia de Estilo e Imagem + Bônus Exclusivos',
          subtitle: 'Criado para quem quer muito mais do que "saber seu estilo"',
          ctaText: 'Quero meu Guia + Bônus',
          ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10'
        },
        style: {
          textAlign: 'center',
          padding: '24px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          border: '1px solid rgba(184, 155, 122, 0.2)'
        }
      },
      products: {
        visible: true,
        content: {
          bonusTitle: 'E ainda recebe 2 bônus poderosos:',
          bonus1Title: 'Peças-chave do Guarda-Roupa de Sucesso',
          bonus1Description: 'Itens essenciais que descomplicam a rotina e valorizam o seu estilo pessoal.',
          bonus1Image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp',
          bonus2Title: 'Mini Guia de Visagismo Facial',
          bonus2Description: 'Para alinhar seu rosto, cabelo e maquiagem com a sua identidade visual.',
          bonus2Image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp',
          productImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp'
        },
        style: {
          backgroundColor: '#fff7f3',
          padding: '24px',
          borderRadius: '8px',
          margin: '24px 0'
        }
      },
      pricing: {
        visible: true,
        content: {
          regularPrice: 'R$ 175,00',
          price: 'R$ 39,00',
          ctaText: 'Quero meu Guia + Bônus por R$39,00',
          ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912'
        },
        style: {
          backgroundColor: '#fff7f3',
          padding: '24px',
          borderRadius: '8px',
          textAlign: 'center'
        }
      },
      testimonials: {
        visible: true,
        content: {
          title: 'O que Outras Mulheres Estão Dizendo'
        },
        style: {
          padding: '24px 0'
        }
      }
    },
    globalStyles: {
      primaryColor: '#B89B7A',
      secondaryColor: '#aa6b5d',
      textColor: '#432818',
      backgroundColor: '#fffaf7',
      fontFamily: 'system-ui, sans-serif',
      logoHeight: 60,
      logo: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg',
      logoAlt: 'Logo do Quiz de Estilo'
    },
    blocks: []
  };
  
  // Tenta carregar uma configuração remota se a URL tiver um parâmetro "config"
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const remoteConfigUrl = searchParams.get('config');
    
    if (remoteConfigUrl) {
      const loadRemoteConfig = async () => {
        setIsLoading(true);
        try {
          const config = await fetchRemoteConfig(remoteConfigUrl);
          
          if (validateRemoteConfig(config)) {
            const normalizedConfig = normalizeRemoteConfig(config);
            setInitialConfig(normalizedConfig);
            
            toast({
              title: 'Configuração remota carregada',
              description: 'O template foi atualizado a partir da configuração remota'
            });
          } else {
            toast({
              title: 'Configuração inválida',
              description: 'A configuração remota não tem o formato esperado',
              variant: 'destructive'
            });
            setInitialConfig(defaultLovableConfig);
          }
        } catch (error) {
          console.error('Erro ao carregar configuração remota:', error);
          toast({
            title: 'Erro ao carregar configuração',
            description: 'Não foi possível carregar a configuração remota',
            variant: 'destructive'
          });
          setInitialConfig(defaultLovableConfig);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadRemoteConfig();
    } else {
      setInitialConfig(defaultLovableConfig);
    }
  }, [location.search, styleCategory]);
  
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-[#B89B7A]" />
          <h2 className="mt-4 text-lg font-medium text-[#432818]">Carregando configuração remota...</h2>
          <p className="text-sm text-[#8F7A6A]">Aguarde enquanto importamos o template</p>
        </div>
      </div>
    );
  }
  
  if (!initialConfig) {
    return null; // Aguardando a configuração ser carregada
  }
  
  return (
    <div className="h-screen">
      {showTemplates ? (
        <div className="p-8 max-w-4xl mx-auto">
          <Button
            onClick={() => setShowTemplates(false)}
            variant="outline"
            className="mb-4"
          >
            Voltar ao Editor
          </Button>
          <TemplateList onSelectTemplate={() => setShowTemplates(false)} />
        </div>
      ) : (
        <ResultPageVisualEditor 
          selectedStyle={selectedStyle} 
          onShowTemplates={() => setShowTemplates(true)}
          initialConfig={initialConfig}
        />
      )}
    </div>
  );
};

export default LovableEditorPage; 