
import { useState } from 'react';
import QuizIntro from '../components/QuizIntro';
import QuizPage from '../components/QuizPage';
import { useQuizContext } from '../context/QuizContext';

const Index = () => {
  const [started, setStarted] = useState(false);
  const { startQuiz } = useQuizContext();

  const handleStart = async (name: string) => {
    try {
      await startQuiz(name, 'default-quiz');
      localStorage.setItem('userName', name);
      setStarted(true);
    } catch (error) {
      console.error('Error starting quiz:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {!started ? (
        <QuizIntro onStart={handleStart} />
      ) : (
        <QuizPage />
      )}
    </div>
  );
};

export default Index;
