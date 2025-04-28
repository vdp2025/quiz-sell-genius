
export interface StyleResult {
  category: 'Natural' | 'Clássico' | 'Contemporâneo' | 'Elegante' | 'Romântico' | 'Sexy' | 'Dramático' | 'Criativo';
  score: number;
  percentage: number;
}

export interface QuizResult {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  totalSelections: number;
}

export interface QuizOption {
  id: string;
  text: string;
  styleCategory: StyleResult['category'];
  imageUrl?: string;
}

export interface QuizQuestion {
  id: string;
  title: string;
  question: string;
  options: QuizOption[];
  multiSelect: number;
  imageUrl?: string;
}

export interface UserResponse {
  questionId: string;
  selectedOptions: string[];
}
