export const defaultResultTemplate = {
  header: {
    content: {
      title: 'Seu Estilo Predominante',
      subtitle: 'Descubra mais sobre seu estilo único e como aproveitar ao máximo suas características'
    },
    style: {
      paddingY: '24',
      paddingX: '16',
      backgroundColor: '#FAF9F7',
      textColor: '#432818',
      borderRadius: '0' // Changed from number to string
    },
    visible: true
  },
  mainContent: {
    content: {
      description: 'Aqui será exibida uma descrição detalhada do seu estilo predominante, com características, recomendações e dicas personalizadas.',
      mainImage: 'https://placehold.co/600x400?text=Estilo+Predominante',
      tabletImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp',
      showSecondaryStyles: true,
      showOffer: true
    },
    style: {
      padding: '20px',
      backgroundColor: '#FFFFFF',
      textColor: '#432818'
    },
    visible: true
  },
  offer: {
    content: {
      title: 'Guia de Estilo e Imagem Personalizado',
      description: 'Adquira seu guia completo com análise detalhada, paleta de cores personalizada e recomendações de peças específicas para o seu tipo de estilo.',
      features: [
        'Análise detalhada do seu estilo pessoal',
        'Paleta de cores personalizada',
        'Guia de peças essenciais para o seu guarda-roupa',
        'Dicas de tecidos e modelagens ideais'
      ],
      ctaText: 'Adquirir meu Guia de Estilo',
      ctaLink: '#',
      price: 'R$ 97,00',
      discountPrice: 'R$ 67,00'
    },
    style: {
      padding: '24px',
      backgroundColor: '#FAF9F7',
      accentColor: '#B89B7A',
      textColor: '#432818'
    },
    visible: true
  }
};

// Template Lovable
export const lovableTemplate = {
  id: 'lovable-template',
  name: 'Lovable Template',
  description: 'Um template elegante com design moderno e seção de vendas otimizada.',
  preview: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp',
  config: {
    styleType: 'default',
    header: {
      visible: true,
      style: {
        fontFamily: 'Playfair Display, serif',
        padding: '20px 0',
        backgroundColor: '#fffaf7',
        borderRadius: '0',
      },
      content: {
        title: 'Seu Estilo é {style}',
        subtitle: 'Descubra como aplicar seu estilo no dia a dia'
      }
    },
    mainContent: {
      visible: true,
      style: {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        border: '1px solid rgba(184, 155, 122, 0.2)'
      },
      content: {}
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
  }
};

// Exporte todos os templates disponíveis
export const templates = [
  // ... existing templates ...
  lovableTemplate
];
