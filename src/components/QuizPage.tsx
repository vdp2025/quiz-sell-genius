import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { UserResponse } from '@/types/quiz';
import { toast } from './ui/use-toast';
import { QuizContainer } from './quiz/QuizContainer';
import { QuizContent } from './quiz/QuizContent';
import { QuizTransitionManager } from './quiz/QuizTransitionManager';
import { QuizNavigation } from './navigation/QuizNavigation';
import { strategicQuestions } from '@/data/strategicQuestions';
import { analyticsService } from '../services/analyticsService';

const QuizPage: React.FC = () => {
  const { user } = useAuth();
  // State declarations
  const [showingStrategicQuestions, setShowingStrategicQuestions] = useState(false);
  const [showingTransition, setShowingTransition] = useState(false);
  const [showingFinalTransition, setShowingFinalTransition] = useState(false);
  const [currentStrategicQuestionIndex, setCurrentStrategicQuestionIndex] = useState(0);
  const [strategicAnswers, setStrategicAnswers] = useState<Record<string, string[]>>({});
  const [startTime, setStartTime] = useState<number>(Date.now());

  // Get quiz logic functions
  const {
    currentQuestion,
    currentQuestionIndex,
    currentAnswers,
    isLastQuestion,
    handleAnswer,
    handleNext,
    handlePrevious,
    totalQuestions,
    calculateResults,
    handleStrategicAnswer: saveStrategicAnswer,
    submitQuizIfComplete
  } = useQuizLogic();

  // Rastrear tempo gasto em cada questão
  useEffect(() => {
    if (currentQuestion) {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      analyticsService.trackTimeSpent(currentQuestion.id, timeSpent);
      setStartTime(Date.now());
      
      // Rastrear visualização da questão
      analyticsService.trackQuestionView(currentQuestion.id, currentQuestion.text);
    }
  }, [currentQuestion]);

  // Rastrear abandono do quiz
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!showingFinalTransition) {
        analyticsService.trackQuizAbandonment(currentQuestion?.id || 0);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [currentQuestion, showingFinalTransition]);

  const handleAnswerSubmit = (response: UserResponse) => {
    // Rastrear resposta
    analyticsService.trackQuestionAnswer(response.questionId, response.answer);
    
    if (showingStrategicQuestions) {
      handleStrategicAnswer(response);
    } else {
      handleAnswer(response.questionId.toString(), [response.answer]);
    }
  };

  const handleNextClick = () => {
    if (isLastQuestion) {
      const results = calculateResults();
      analyticsService.trackQuizComplete(results);
      setShowingTransition(true);
    } else {
      handleNext();
    }
  };

  const handleStrategicAnswer = (response: UserResponse) => {
    saveStrategicAnswer(response.questionId.toString(), [response.answer]);
    setStrategicAnswers(prev => ({
      ...prev,
      [response.questionId]: [response.answer]
    }));

    if (currentStrategicQuestionIndex < strategicQuestions.length - 1) {
      setCurrentStrategicQuestionIndex(prev => prev + 1);
    } else {
      setShowingFinalTransition(true);
    }
  };

  const handleShowResult = () => {
    const results = submitQuizIfComplete();
    if (results) {
      analyticsService.trackQuizComplete(results);
    }
  };

  // Save user name to localStorage
  useEffect(() => {
    if (user?.userName) {
      localStorage.setItem('userName', user.userName);
      console.log('User name saved:', user.userName);
    }
  }, [user]);

  return (
    <QuizContainer>
      <QuizTransitionManager
        showingTransition={showingTransition}
        showingFinalTransition={showingFinalTransition}
        handleStrategicAnswer={handleStrategicAnswer}
        strategicAnswers={strategicAnswers}
        handleShowResult={handleShowResult}
      />

      {!showingTransition && !showingFinalTransition && (
        <>
          <QuizContent
            user={user}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            showingStrategicQuestions={showingStrategicQuestions}
            currentStrategicQuestionIndex={currentStrategicQuestionIndex}
            currentQuestion={currentQuestion}
            currentAnswers={currentAnswers}
            handleAnswerSubmit={handleAnswerSubmit}
            handleNextClick={handleNextClick}
            handlePrevious={handlePrevious}
          />
          
          <QuizNavigation
            currentStep={currentQuestionIndex + 1}
            totalSteps={totalQuestions}
            onNext={handleNextClick}
            onPrevious={handlePrevious}
          />
        </>
      )}
    </QuizContainer>
  );
};

export default QuizPage;
