import { defineStore } from 'pinia';

interface StyleResult {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  characteristics: string[];
}

type StyleCategory = 'romantico' | 'classico' | 'criativo' | 'elegante' | 'natural' | 'dramatico';

interface StyleDefinition {
  title: string;
  description: string;
  imageUrl: string;
  characteristics: string[];
}

interface Question {
  id: number;
  text: string;
  options: string[];
  category: string;
  stylePoints: Record<StyleCategory, number>;
}

interface Answer {
  questionId: number;
  answer: string;
  stylePoints: Record<StyleCategory, number>;
}

interface Result {
  category: string;
  score: number;
  description: string;
}

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    userName: '',
    questions: [
      {
        id: 1,
        text: "Como você se sente mais confortável ao se vestir?",
        options: [
          "Com peças delicadas e românticas",
          "Com looks clássicos e elegantes",
          "Com combinações criativas e diferentes"
        ],
        category: "estilo_pessoal",
        stylePoints: {
          'romantico': 3,
          'classico': 1,
          'criativo': 0,
          'elegante': 2,
          'natural': 1,
          'dramatico': 0
        }
      },
      // Adicione mais perguntas aqui
    ] as Question[],
    currentQuestionIndex: 0,
    answers: [] as Answer[],
    primaryStyle: null as StyleResult | null,
    secondaryStyles: [] as StyleResult[],
    styles: {
      'romantico': {
        title: 'Romântico',
        description: 'Seu estilo é delicado e feminino, com preferência por peças suaves e detalhes graciosos.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745193439/romantic-style.jpg',
        characteristics: [
          'Aprecia detalhes delicados e românticos',
          'Prefere cores suaves e pastéis',
          'Gosta de peças com babados e rendas',
          'Valoriza a feminilidade no vestuário'
        ]
      },
      'classico': {
        title: 'Clássico',
        description: 'Seu estilo é atemporal e sofisticado, com preferência por peças bem estruturadas e de qualidade.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745193439/classic-style.jpg',
        characteristics: [
          'Valoriza peças atemporais',
          'Prefere cores neutras e clássicas',
          'Aprecia qualidade e bom caimento',
          'Busca elegância e sofisticação'
        ]
      },
      'criativo': {
        title: 'Criativo',
        description: 'Seu estilo é único e expressivo, com uma abordagem artística e original ao se vestir.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745193439/creative-style.jpg',
        characteristics: [
          'Gosta de misturar estampas e texturas',
          'Aprecia peças únicas e diferentes',
          'Expressa personalidade através das roupas',
          'Não tem medo de ousar'
        ]
      },
      'elegante': {
        title: 'Elegante',
        description: 'Seu estilo é refinado e sofisticado, com preferência por peças que transmitem poder e presença.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745193439/elegant-style.jpg',
        characteristics: [
          'Valoriza a sofisticação',
          'Prefere looks minimalistas e refinados',
          'Aprecia tecidos nobres',
          'Busca transmitir autoridade'
        ]
      },
      'natural': {
        title: 'Natural',
        description: 'Seu estilo é descontraído e confortável, com preferência por peças práticas e versáteis.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745193439/natural-style.jpg',
        characteristics: [
          'Valoriza o conforto',
          'Prefere looks descontraídos',
          'Aprecia tecidos naturais',
          'Busca praticidade'
        ]
      },
      'dramatico': {
        title: 'Dramático',
        description: 'Seu estilo é marcante e impactante, com preferência por peças que chamam atenção.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745193439/dramatic-style.jpg',
        characteristics: [
          'Valoriza o impacto visual',
          'Prefere looks marcantes',
          'Aprecia contrastes',
          'Busca ser notado'
        ]
      }
    } as Record<StyleCategory, StyleDefinition>,
    results: [] as Result[],
    totalScore: 0,
  }),

  getters: {
    currentQuestion: (state) => state.questions[state.currentQuestionIndex],
    isLastQuestion: (state) => state.currentQuestionIndex === state.questions.length - 1,
    progress: (state) => (state.currentQuestionIndex + 1) / state.questions.length * 100,
    getCurrentAnswer: (state) => (questionId: number) => {
      const answer = state.answers.find(a => a.questionId === questionId);
      return answer ? answer.answer : null;
    },
  },

  actions: {
    setUserName(name: string) {
      this.userName = name;
      localStorage.setItem('userName', name);
    },

    initializeQuiz() {
      this.currentQuestionIndex = 0;
      this.answers = [];
      this.primaryStyle = null;
      this.secondaryStyles = [];
    },

    setAnswer(answer: string) {
      const question = this.currentQuestion;
      if (question) {
        const stylePoints = { ...question.stylePoints };
        this.answers.push({
          questionId: question.id,
          answer,
          stylePoints
        });
      }
    },

    calculateResults() {
      const styleScores: Record<StyleCategory, number> = {
        'romantico': 0,
        'classico': 0,
        'criativo': 0,
        'elegante': 0,
        'natural': 0,
        'dramatico': 0
      };
      
      // Calcular pontuação para cada estilo
      this.answers.forEach(answer => {
        Object.entries(answer.stylePoints).forEach(([style, points]) => {
          styleScores[style as StyleCategory] += points;
        });
      });

      // Ordenar estilos por pontuação
      const sortedStyles = Object.entries(styleScores)
        .sort(([, a], [, b]) => b - a)
        .map(([style]) => style as StyleCategory);

      // Definir estilo primário e secundários
      if (sortedStyles.length > 0) {
        const primaryStyleCategory = sortedStyles[0];
        this.primaryStyle = {
          ...this.styles[primaryStyleCategory],
          category: primaryStyleCategory
        };

        this.secondaryStyles = sortedStyles
          .slice(1, 3)
          .map(style => ({
            ...this.styles[style],
            category: style
          }));
      }
    },

    nextQuestion() {
      if (!this.isLastQuestion) {
        this.currentQuestionIndex++;
      }
    },

    previousQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    },

    resetQuiz() {
      this.initializeQuiz();
    },
  },
}); 