
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface QuizIntroProps {
  onStart: (name: string) => void;
}

const QuizIntro: React.FC<QuizIntroProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleStart = () => {
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center px-4 py-8">
        {/* Logo e Barra de Progresso */}
        <h2 className="text-3xl font-bold mb-4">Quiz de Estilo</h2>
        <div className="w-full max-w-[140px] h-[3px] bg-[#B89B7A] mb-2" />
        <div className="w-full max-w-[500px] h-[1px] bg-[#E5E2DE]" />

        {/* Título */}
        <h1 className="font-playfair text-3xl font-medium text-[#1A1818] text-center mt-8 mb-10">
          Teste de Estilo Pessoal
        </h1>

        {/* Formulário */}
        <div className="w-full max-w-md">
          <form
            onSubmit={e => { e.preventDefault(); handleStart(); }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-[#1A1818] text-sm font-medium"
              >
                NOME <span className="text-[#B89B7A]">*</span>
              </label>
              <Input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Digite seu nome aqui..."
                className="w-full h-12 px-4 bg-[#F5F5F5] border-none rounded-md text-[#1A1818] placeholder:text-[#8E9196]"
              />
            </div>
            
            <Button
              type="submit"
              disabled={!name.trim()}
              className="w-full h-12 bg-[#B89B7A] hover:bg-[#A38A69] text-white font-medium rounded-md transition-colors"
            >
              Continuar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuizIntro;
