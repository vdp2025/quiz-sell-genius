
import React from 'react';
import { useQuizContext } from '../context/QuizContext';
import { UserResponse } from '@/types/quiz';
import { QuizQuestion } from './QuizQuestion';
import { Progress } from './ui/progress';

const QuizPage: React.FC = () => {
  const {
    currentQuestion,
    currentQuestionIndex,
    currentAnswers,
    isLastQuestion,
    handleAnswer,
    handleNext,
    handlePrevious,
    totalQuestions,
    calculateResults
  } = useQuizContext();

  const handleAnswerSubmit = (response: UserResponse) => {
    handleAnswer(response.questionId, response.selectedOptions);
  };

  const handleNextClick = () => {
    if (isLastQuestion) {
      const results = calculateResults();
      console.log('Quiz completed. Results:', results);
      localStorage.setItem('quizResult', JSON.stringify(results));
      window.location.href = '/resultado';
    } else {
      handleNext();
    }
  };

  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-[#1A1818]/70 mb-1">
            <span>Pergunta {currentQuestionIndex + 1} de {totalQuestions}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <QuizQuestion
          question={currentQuestion}
          onAnswer={handleAnswerSubmit}
          currentAnswers={currentAnswers || []}
          onNextClick={handleNextClick}
          onPreviousClick={currentQuestionIndex > 0 ? handlePrevious : undefined}
          showQuestionImage={true}
        />
      </div>
    </div>
  );
};

export default QuizPage;
