
import { QuizBuilderState } from '@/types/quizBuilder';
import { generateId } from '@/utils/idGenerator';

export const styleQuizTemplate2: QuizBuilderState = {
  components: [
    {
      id: generateId(),
      type: 'stageCover',
      order: 0,
      stageId: 'cover',
      data: {
        title: 'Quiz de Estilo Avançado',
        subtitle: 'Descubra seu estilo predominante e como criar looks que valorizam sua personalidade',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp',
        stageTitle: 'Início',
        stageNumber: 1,
        buttonText: 'Iniciar Quiz',
        backgroundColor: '#FFFAF0',
        textColor: '#432818'
      },
      style: {
        backgroundColor: '#FFFAF0',
        textColor: '#432818',
        paddingY: '2rem',
        paddingX: '1rem',
        borderRadius: '8px'
      }
    },
    {
      id: generateId(),
      type: 'stageQuestion',
      order: 1,
      stageId: 'q1',
      data: {
        title: 'QUAL VISUAL VOCÊ MAIS SE IDENTIFICA?',
        question: 'Selecione 3 opções que mais combinam com seu estilo',
        options: [
          'Visual leve, despojado e natural.',
          'Visual clássico e tradicional.',
          'Visual casual com toque atual.',
          'Visual refinado e imponente.',
          'Visual romântico, feminino e delicado.',
          'Visual sensual, com saia justa e decote.',
          'Visual marcante e urbano (jeans + jaqueta).',
          'Visual criativo, colorido e ousado.'
        ],
        optionImages: [
          '/lovable-uploads/24f7dc2c-ab37-41ba-a154-786b0626ae04.png',
          '/lovable-uploads/0fb54364-9c71-4373-b6e7-500e6f9a2732.png',
          '/lovable-uploads/22d18ed7-b1fc-4fb4-9538-f0ab93fe5c75.png',
          '/lovable-uploads/e779494d-0c8d-408d-b034-1964a3b76469.png',
          '/lovable-uploads/94638e1c-0180-4cfd-80be-26db97a1e58f.png',
          '/lovable-uploads/919b184d-940d-4a4f-b53c-36792cbd6114.png',
          '/lovable-uploads/84341867-0bff-402e-a89f-be5747b706ba.png',
          '/lovable-uploads/d633e490-d0f2-4429-998e-bceeeda790f8.png'
        ],
        optionStyleCategories: [
          'Natural',
          'Clássico',
          'Contemporâneo',
          'Elegante',
          'Romântico',
          'Sexy',
          'Dramático',
          'Criativo'
        ],
        multiSelect: 3,
        displayType: 'both',
        imageSize: 'medium',
        required: true,
        stageTitle: 'Pergunta 1',
        stageNumber: 2,
        layout: {
          columns: 2,
          direction: 'vertical'
        },
        backgroundColorQuestion: '#FFFAF0',
        textColorQuestion: '#432818',
        selectionIndicator: 'border'
      },
      style: {
        backgroundColor: '#FFFAF0',
        textColor: '#432818',
        paddingY: '2rem',
        paddingX: '1rem',
        borderRadius: '8px'
      }
    },
    {
      id: generateId(),
      type: 'stageQuestion',
      order: 2,
      stageId: 'q2',
      data: {
        title: 'QUAL CASACO É SEU FAVORITO?',
        question: 'Selecione 3 opções que mais combinam com seu estilo',
        options: [
          'Cardigã bege confortável e casual.',
          'Blazer verde estruturado.',
          'Trench coat bege tradicional.',
          'Blazer branco refinado.',
          'Casaco pink vibrante e moderno.',
          'Jaqueta vinho de couro estilosa.',
          'Jaqueta preta estilo rocker.',
          'Casaco estampado criativo e colorido.'
        ],
        optionImages: [
          '/lovable-uploads/1ac66423-7712-4c33-9c28-13e8b6fe3170.png',
          '/lovable-uploads/169fe8d0-8afd-4447-a9cc-79d917967e64.png',
          '/lovable-uploads/0530ff81-b41d-45eb-8b47-ef88f75f7d93.png',
          '/lovable-uploads/d9da05d3-6fdd-46d0-afea-42417af058c5.png',
          '/lovable-uploads/5b819e5d-ca43-465a-906e-353764bdb2ec.png',
          '/lovable-uploads/54671bc8-ed46-4e5d-a347-5c8e8fe45f8b.png',
          '/lovable-uploads/e30cb887-b027-40ab-b112-fe8c2244d789.png',
          '/lovable-uploads/fc8f4066-6f40-4ff8-bc55-460da133b6c2.png'
        ],
        optionStyleCategories: [
          'Natural',
          'Clássico',
          'Contemporâneo',
          'Elegante',
          'Romântico',
          'Sexy',
          'Dramático',
          'Criativo'
        ],
        multiSelect: 3,
        displayType: 'both',
        imageSize: 'medium',
        required: true,
        stageTitle: 'Pergunta 2',
        stageNumber: 3,
        layout: {
          columns: 2,
          direction: 'vertical'
        },
        backgroundColorQuestion: '#FFFAF0',
        textColorQuestion: '#432818',
        selectionIndicator: 'border'
      },
      style: {
        backgroundColor: '#FFFAF0',
        textColor: '#432818',
        paddingY: '2rem',
        paddingX: '1rem',
        borderRadius: '8px'
      }
    },
    {
      id: generateId(),
      type: 'stageQuestion',
      order: 3,
      stageId: 'q3',
      data: {
        title: 'QUAL SUA CALÇA FAVORITA?',
        question: 'Selecione 3 opções que mais combinam com seu estilo',
        options: [
          'Calça fluida acetinada bege.',
          'Calça de alfaiataria cinza.',
          'Jeans reto e básico.',
          'Calça reta bege de tecido.',
          'Calça ampla rosa alfaiatada.',
          'Legging preta de couro.',
          'Calça reta preta de couro.',
          'Calça estampada floral leve e ampla.'
        ],
        optionImages: [
          '/lovable-uploads/86053444-8589-43e6-af61-02764cf80510.png',
          '/lovable-uploads/e2627b2e-8e68-48e0-a678-c685c5631515.png',
          '/lovable-uploads/ea329cbe-6455-4aca-8fa4-cf73031ca26e.png',
          '/lovable-uploads/54a9ca5f-9b1f-48a3-9fd8-0aa9a240b8ae.png',
          '/lovable-uploads/061e6932-2ddc-4100-ad82-def9909cfcdc.png',
          '/lovable-uploads/027348ed-9275-43b2-ba49-d49d5baca56a.png',
          '/lovable-uploads/84341867-0bff-402e-a89f-be5747b706ba.png',
          '/lovable-uploads/d633e490-d0f2-4429-998e-bceeeda790f8.png'
        ],
        optionStyleCategories: [
          'Natural',
          'Clássico',
          'Contemporâneo',
          'Elegante',
          'Romântico',
          'Sexy',
          'Dramático',
          'Criativo'
        ],
        multiSelect: 3,
        displayType: 'both',
        imageSize: 'medium',
        required: true,
        stageTitle: 'Pergunta 3',
        stageNumber: 4,
        layout: {
          columns: 2,
          direction: 'vertical'
        },
        backgroundColorQuestion: '#FFFAF0',
        textColorQuestion: '#432818',
        selectionIndicator: 'border'
      },
      style: {
        backgroundColor: '#FFFAF0',
        textColor: '#432818',
        paddingY: '2rem',
        paddingX: '1rem',
        borderRadius: '8px'
      }
    },
    {
      id: generateId(),
      type: 'stageResult',
      order: 4,
      stageId: 'result',
      data: {
        title: 'Seu Resultado de Estilo Pessoal',
        subtitle: 'Baseado nas suas escolhas, calculamos seu estilo predominante',
        stageTitle: 'Resultado',
        stageNumber: 5,
        resultLayout: 'modern',
        primaryStyleTitle: 'Olá, seu Estilo Predominante é:',
        secondaryStylesTitle: 'Seus Estilos Complementares:',
        showPercentages: true,
        showDescriptions: true,
        callToActionText: 'Conhecer o Guia Completo',
        callToActionUrl: '#',
        offerImageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp',
        authorImageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp',
        backgroundColor: '#FFFAF0',
        textColor: '#432818',
        accentColor: '#B89B7A'
      },
      style: {
        backgroundColor: '#FFFAF0',
        textColor: '#432818',
        paddingY: '2rem',
        paddingX: '1rem',
        borderRadius: '8px'
      }
    }
  ],
  stages: [
    {
      id: 'cover',
      title: 'Início',
      order: 0,
      type: 'cover'
    },
    {
      id: 'q1',
      title: 'Pergunta 1',
      order: 1,
      type: 'question'
    },
    {
      id: 'q2',
      title: 'Pergunta 2',
      order: 2,
      type: 'question'
    },
    {
      id: 'q3',
      title: 'Pergunta 3',
      order: 3,
      type: 'question'
    },
    {
      id: 'result',
      title: 'Resultado',
      order: 4,
      type: 'result'
    }
  ]
};
