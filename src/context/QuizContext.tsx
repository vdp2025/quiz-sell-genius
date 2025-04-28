
import React, { createContext, useContext, ReactNode } from 'react';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { useToast } from '@/components/ui/use-toast';
import { QuizResult } from '@/types/quiz';

type QuizContextType = ReturnType<typeof useQuizLogic> & {
  startQuiz: (name: string, quizId: string) => Promise<any>;
  submitAnswers: (answers: Array<{ questionId: string; optionId: string; points: number }>) => Promise<void>;
  submitResults: (results: QuizResult) => Promise<void>;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const quizLogic = useQuizLogic();
  const { toast } = useToast();
  
  const startQuiz = async (name: string, quizId: string) => {
    try {
      console.log(`Starting quiz for ${name} with quiz ID ${quizId}`);
      return { id: '1', name };
    } catch (error) {
      toast({
        title: "Erro ao iniciar o quiz",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const submitAnswers = async (answers: Array<{ questionId: string; optionId: string; points: number }>) => {
    try {
      console.log('Submitting answers:', answers);
    } catch (error) {
      toast({
        title: "Erro ao salvar respostas",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const submitResults = async (results: QuizResult) => {
    try {
      console.log("Results submitted:", results);
      localStorage.setItem('quizResult', JSON.stringify(results));
      window.location.href = '/resultado';
    } catch (error) {
      toast({
        title: "Erro ao salvar resultados",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const contextValue = {
    ...quizLogic,
    startQuiz,
    submitAnswers,
    submitResults
  };

  return (
    <QuizContext.Provider value={contextValue}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
};
