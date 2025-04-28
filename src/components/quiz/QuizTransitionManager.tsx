
import React from 'react';
import { UserResponse } from '@/types/quiz';

interface QuizTransitionManagerProps {
  showingTransition: boolean;
  showingFinalTransition: boolean;
  handleStrategicAnswer: (response: UserResponse) => void;
  strategicAnswers: Record<string, string[]>;
  handleShowResult: () => void;
}

const QuizTransitionManager: React.FC<QuizTransitionManagerProps> = ({
  showingTransition,
  showingFinalTransition,
  handleStrategicAnswer,
  strategicAnswers,
  handleShowResult,
}) => {
  if (showingFinalTransition) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Quase lá!</h2>
        <p className="mb-6">Estamos calculando seu resultado final...</p>
        <button
          onClick={handleShowResult}
          className="bg-[#B89B7A] text-white py-2 px-4 rounded-md hover:bg-[#A38A69]"
        >
          Ver meu resultado
        </button>
      </div>
    );
  }

  if (showingTransition) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Calculando seu estilo...</h2>
        <p className="mb-6">Estamos processando suas respostas para determinar seu estilo único.</p>
        <div className="w-full max-w-md mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#B89B7A] animate-pulse" style={{ width: '80%' }}></div>
        </div>
      </div>
    );
  }

  return null;
};

export { QuizTransitionManager };
