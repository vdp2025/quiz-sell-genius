
import { useState, useCallback } from 'react';
import { quizQuestions } from '../data/quizQuestions';
import { QuizResult } from '@/types/quiz';

export const useQuizLogic = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const currentAnswers = answers[currentQuestion?.id] || [];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
  const totalQuestions = quizQuestions.length;

  const handleAnswer = useCallback((questionId: string, selectedOptions: string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOptions
    }));
  }, []);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResults();
      setQuizCompleted(true);
    }
  }, [currentQuestionIndex]);

  const calculateResults = useCallback(() => {
    // Implementação simples para calcular os resultados
    const styleCounter = {
      'Natural': 0,
      'Clássico': 0,
      'Contemporâneo': 0,
      'Elegante': 0,
      'Romântico': 0,
      'Sexy': 0,
      'Dramático': 0,
      'Criativo': 0
    };

    let totalSelections = 0;

    // Lógica básica de contagem
    Object.entries(answers).forEach(([questionId, optionIds]) => {
      // Aqui você implementaria a contagem real baseada nas respostas
      totalSelections += optionIds.length;
    });

    // Criar objeto de resultado
    const result = {
      primaryStyle: {
        category: 'Contemporâneo',
        score: 10,
        percentage: 40
      },
      secondaryStyles: [
        {
          category: 'Elegante',
          score: 8,
          percentage: 30
        }
      ],
      totalSelections
    };

    setQuizResult(result);
    localStorage.setItem('quizResult', JSON.stringify(result));
    return result;
  }, [answers]);

  return {
    currentQuestion,
    currentQuestionIndex,
    currentAnswers,
    isLastQuestion,
    quizCompleted,
    quizResult,
    handleAnswer,
    handleNext,
    handlePrevious,
    totalQuestions,
    calculateResults
  };
};
