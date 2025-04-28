
import React from 'react';
import { QuizQuestion as QuizQuestionType, UserResponse } from '../types/quiz';
import { Button } from './ui/button';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (response: UserResponse) => void;
  currentAnswers: string[];
  onNextClick?: () => void;
  onPreviousClick?: () => void;
  showQuestionImage?: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  currentAnswers,
  onNextClick,
  onPreviousClick,
  showQuestionImage = false
}) => {
  const handleOptionSelect = (optionId: string) => {
    let newSelectedOptions: string[];
    
    if (currentAnswers.includes(optionId)) {
      newSelectedOptions = currentAnswers.filter(id => id !== optionId);
    } else {
      if (currentAnswers.length >= question.multiSelect) {
        newSelectedOptions = [...currentAnswers.slice(1), optionId];
      } else {
        newSelectedOptions = [...currentAnswers, optionId];
      }
    }
    
    onAnswer({
      questionId: question.id,
      selectedOptions: newSelectedOptions
    });
  };
  
  const questionType = question.type || 'text';
  const displayTitle = question.title || '';
  const displayText = question.question || question.text || '';
  
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl sm:text-2xl font-bold text-[#432818]">
          {displayTitle}
        </h3>
        <p className="text-sm text-[#1A1818]/80">
          {displayText}
        </p>
        <p className="text-xs text-[#1A1818]/50">
          {currentAnswers.length}/{question.multiSelect} selecionadas
        </p>
      </div>

      <div className={`grid ${questionType === 'text' ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-3'}`}>
        {question.options.map(option => (
          <div
            key={option.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors
              ${currentAnswers.includes(option.id)
                ? 'bg-[#B89B7A] text-white border-[#B89B7A]'
                : 'bg-white text-[#1A1818] border-gray-200 hover:border-[#B89B7A]/50'}
              ${currentAnswers.length >= question.multiSelect && !currentAnswers.includes(option.id)
                ? 'opacity-50 cursor-not-allowed'
                : ''
              }`}
            onClick={() => {
              if (!(currentAnswers.length >= question.multiSelect && !currentAnswers.includes(option.id))) {
                handleOptionSelect(option.id);
              }
            }}
          >
            {option.imageUrl && (
              <img 
                src={option.imageUrl} 
                alt={option.text}
                className="w-full h-auto rounded mb-2" 
              />
            )}
            <div className="font-medium">{option.text}</div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-6">
        <Button
          type="button"
          onClick={onPreviousClick}
          disabled={!onPreviousClick}
          className="bg-gray-200 text-[#1A1818] hover:bg-gray-300"
        >
          Voltar
        </Button>
        <Button
          type="button"
          onClick={onNextClick}
          disabled={!onNextClick || currentAnswers.length < question.multiSelect}
          className="bg-[#B89B7A] text-white hover:bg-[#A38A69]"
        >
          Próxima
        </Button>
      </div>
    </div>
  );
};

export { QuizQuestion };
