
import { QuizQuestion } from '@/types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    title: 'QUAL O SEU TIPO DE ROUPA FAVORITA?',
    question: 'Selecione 3 opções que mais combinam com seu estilo',
    options: [
      {
        id: 'q1_a',
        text: 'Looks confortáveis, soltos ao corpo, práticos para usar e para cuidar.',
        styleCategory: 'Natural'
      },
      {
        id: 'q1_b',
        text: 'Roupas discretas, com caimento clássico e que passam despercebidas.',
        styleCategory: 'Clássico'
      },
      {
        id: 'q1_c',
        text: 'Roupas confortáveis mas com um toque de estilo.',
        styleCategory: 'Contemporâneo'
      },
      {
        id: 'q1_d',
        text: 'Peças com toques refinados, caimento perfeito, atual, mas sem modismos.',
        styleCategory: 'Elegante'
      },
      {
        id: 'q1_e',
        text: 'Roupas delicadas de cores suaves, fluídas no corpo.',
        styleCategory: 'Romântico'
      },
      {
        id: 'q1_f',
        text: 'Roupas que marquem meu corpo, decotes, fendas.',
        styleCategory: 'Sexy'
      },
      {
        id: 'q1_g',
        text: 'Peças estruturadas, assimétricas, modernas.',
        styleCategory: 'Dramático'
      },
      {
        id: 'q1_h',
        text: 'Formas e peças marcantes, em um mix no look.',
        styleCategory: 'Criativo'
      }
    ],
    multiSelect: 3,
    type: 'text'
  },
  {
    id: 'q2',
    title: 'RESUMA A SUA PERSONALIDADE:',
    question: 'Selecione 3 opções que mais combinam com sua personalidade',
    options: [
      {
        id: 'q2_a',
        text: 'Informal, espontânea, alegre, essencialista.',
        styleCategory: 'Natural'
      },
      {
        id: 'q2_b',
        text: 'Conservadora, séria, organizada.',
        styleCategory: 'Clássico'
      },
      {
        id: 'q2_c',
        text: 'Informada, ativa, prática.',
        styleCategory: 'Contemporâneo'
      },
      {
        id: 'q2_d',
        text: 'Exigente, sofisticada, seletiva.',
        styleCategory: 'Elegante'
      },
      {
        id: 'q2_e',
        text: 'Feminina, meiga, delicada, sensível.',
        styleCategory: 'Romântico'
      },
      {
        id: 'q2_f',
        text: 'Glamorosa, vaidosa, sensual.',
        styleCategory: 'Sexy'
      },
      {
        id: 'q2_g',
        text: 'Sou cosmopolita, moderna e audaciosa.',
        styleCategory: 'Dramático'
      },
      {
        id: 'q2_h',
        text: 'Exótica, aventureira, livre.',
        styleCategory: 'Criativo'
      }
    ],
    multiSelect: 3,
    type: 'text'
  },
  {
    id: 'q3',
    title: 'QUAL VISUAL VOCÊ MAIS SE IDENTIFICA?',
    question: 'Selecione 3 opções que mais combinam com seu estilo visual',
    options: [
      {
        id: 'q3_a',
        text: 'Visual leve, despojado e natural.',
        styleCategory: 'Natural',
        imageUrl: '/lovable-uploads/24f7dc2c-ab37-41ba-a154-786b0626ae04.png'
      },
      {
        id: 'q3_b',
        text: 'Visual clássico e tradicional.',
        styleCategory: 'Clássico',
        imageUrl: '/lovable-uploads/0fb54364-9c71-4373-b6e7-500e6f9a2732.png'
      },
      {
        id: 'q3_c',
        text: 'Visual casual com toque atual.',
        styleCategory: 'Contemporâneo',
        imageUrl: '/lovable-uploads/22d18ed7-b1fc-4fb4-9538-f0ab93fe5c75.png'
      },
      {
        id: 'q3_d',
        text: 'Visual refinado e imponente.',
        styleCategory: 'Elegante',
        imageUrl: '/lovable-uploads/e779494d-0c8d-408d-b034-1964a3b76469.png'
      },
      {
        id: 'q3_e',
        text: 'Visual romântico, feminino e delicado.',
        styleCategory: 'Romântico',
        imageUrl: '/lovable-uploads/94638e1c-0180-4cfd-80be-26db97a1e58f.png'
      },
      {
        id: 'q3_f',
        text: 'Visual sensual, com saia justa e decote.',
        styleCategory: 'Sexy',
        imageUrl: '/lovable-uploads/919b184d-940d-4a4f-b53c-36792cbd6114.png'
      },
      {
        id: 'q3_g',
        text: 'Visual marcante e urbano (jeans + jaqueta).',
        styleCategory: 'Dramático',
        imageUrl: '/lovable-uploads/84341867-0bff-402e-a89f-be5747b706ba.png'
      },
      {
        id: 'q3_h',
        text: 'Visual criativo, colorido e ousado.',
        styleCategory: 'Criativo',
        imageUrl: '/lovable-uploads/d633e490-d0f2-4429-998e-bceeeda790f8.png'
      }
    ],
    multiSelect: 3,
    type: 'both'
  },
  {
    id: 'q4',
    title: 'QUAIS ESTAMPAS VOCÊ MAIS SE IDENTIFICA?',
    question: 'Selecione 3 opções que mais combinam com seu estilo',
    options: [
      {
        id: 'q4_a',
        text: 'Estampas clean, com poucas informações.',
        styleCategory: 'Natural'
      },
      {
        id: 'q4_b',
        text: 'Estampas clássicas e atemporais.',
        styleCategory: 'Clássico'
      },
      {
        id: 'q4_c',
        text: 'Atemporais, mas que tenham uma pegada de atual e moderna.',
        styleCategory: 'Contemporâneo'
      },
      {
        id: 'q4_d',
        text: 'Estampas clássicas e atemporais, mas sofisticadas.',
        styleCategory: 'Elegante'
      },
      {
        id: 'q4_e',
        text: 'Estampas florais e/ou delicadas como bolinhas, borboletas e corações.',
        styleCategory: 'Romântico'
      },
      {
        id: 'q4_f',
        text: 'Estampas de animal print, como onça, zebra e cobra.',
        styleCategory: 'Sexy'
      },
      {
        id: 'q4_g',
        text: 'Estampas geométricas, abstratas e exageradas como grandes poás.',
        styleCategory: 'Dramático'
      },
      {
        id: 'q4_h',
        text: 'Estampas diferentes do usual, como africanas, xadrez grandes.',
        styleCategory: 'Criativo'
      }
    ],
    multiSelect: 3,
    type: 'text'
  }
];
