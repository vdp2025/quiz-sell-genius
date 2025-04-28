export interface QuizOption {
  id: string;
  text: string;
  imageUrl?: string;
  styleCategory?: 'Natural' | 'Clássico' | 'Contemporâneo' | 'Elegante' | 'Romântico' | 'Sexy' | 'Dramático' | 'Criativo';
  points?: number;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: Array<{
    id: string;
    text: string;
    imageUrl?: string;
  }>;
  multiSelect?: number;
  category: string;
  imageUrl?: string;
}

export interface UserResponse {
  questionId: number;
  answer: string;
  selectedOptions: string[];
}

export interface StyleResult {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  characteristics: string[];
}

export interface QuizResult {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  totalSelections: number;
}

export interface QuizState {
  userName: string;
  currentQuestionIndex: number;
  answers: Record<string, string[]>;
  completed: boolean;
  result: QuizResult | null;
}

export interface AnalyticsData {
  eventName: string;
  timestamp: string;
  properties: Record<string, any>;
}
