import { useState } from 'react';
import { Link } from 'react-router-dom';
import QuizIntro from '../components/QuizIntro';
import QuizPage from '../components/QuizPage';
import { useQuizContext } from '../context/QuizContext';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [started, setStarted] = useState(false);
  const { startQuiz } = useQuizContext();

  const handleStart = async (name: string) => {
    setStarted(true);
    console.log(`Quiz started by ${name}`);
    localStorage.setItem('userName', name);
  };

  return (
    <div className="min-h-screen bg-background">
      {!started ? (
        <div className="flex flex-col items-center">
          <QuizIntro onStart={handleStart} />
          
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-[#432818]">Ferramentas de Edição</h2>
            <div className="space-y-3">
              <Link to="/editor" className="block">
                <Button 
                  className="w-full bg-[#B89B7A] hover:bg-[#A38A69] text-white"
                >
                  Editor de Página de Resultados Padrão
                </Button>
              </Link>
              
              <Link to="/lovable-editor" className="block">
                <Button 
                  className="w-full bg-[#aa6b5d] hover:bg-[#965b4d] text-white"
                >
                  Editor de Página de Resultados Lovable
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <QuizPage />
      )}
    </div>
  );
};

export default Index;
