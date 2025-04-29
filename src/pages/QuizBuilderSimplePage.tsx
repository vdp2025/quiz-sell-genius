import React from 'react';
import QuizSimpleBuilder from '@/components/quiz-builder/QuizSimpleBuilder';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function QuizBuilderSimplePage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col">
      <header className="bg-white border-b p-4">
        <div className="container max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Editor de Quiz Simplificado</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <QuizSimpleBuilder />
      </main>
    </div>
  );
}

export default QuizBuilderSimplePage; 