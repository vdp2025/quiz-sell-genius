
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface QuizIntroProps {
  onStart: (name: string) => void;
}

const QuizIntro: React.FC<QuizIntroProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F7] px-4 py-4 sm:py-6">
      <div className="w-full max-w-[300px] sm:max-w-[500px] md:max-w-[680px] bg-white shadow-lg rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center">
        <h1 className="font-playfair text-[22px] sm:text-[26px] md:text-[30px] font-bold text-black text-center mb-4 sm:mb-5 leading-tight">
          Teste de Estilo Pessoal
        </h1>

        {/* Barra dourada decorativa */}
        <div className="w-16 sm:w-20 md:w-24 h-[2px] bg-[#B89B7A] mb-4 sm:mb-5"></div>

        {/* Subtítulo */}
        <p className="text-[16px] sm:text-[18px] md:text-[20px] text-black text-center mb-4 sm:mb-6 leading-relaxed">
          Em apenas 3 minutos, descubra seu <span className="font-semibold text-[#B89B7A]">Estilo Predominante</span> e 
          desbloqueie o segredo para criar looks incríveis.
        </p>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="w-full max-w-[280px] sm:max-w-[400px] md:max-w-md flex flex-col gap-3">
          <label htmlFor="name" className="text-[14px] font-semibold text-[#432818]">NOME *</label>
          <Input 
            id="name" 
            placeholder="Digite seu nome para descobrir seu estilo" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            className="w-full text-[16px]" 
            autoFocus 
          />

          <Button 
            type="submit" 
            className={`
              w-full 
              py-4
              text-lg
              font-semibold
              rounded-md 
              shadow-md
              transition-all
              duration-300
              bg-[#B89B7A]
              hover:bg-[#B89B7A]/90
              active:scale-[0.98] 
              disabled:opacity-50 
              disabled:cursor-not-allowed
              mt-2
              border-0
              text-white
              ${name.trim() ? 'animate-subtle-pulse' : ''}
            `}
            disabled={!name.trim()}
          >
            <span className="flex items-center justify-center gap-2">
              DESCOBRIR MEU ESTILO AGORA
              <span className="text-[12px]">{name && `→`}</span>
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QuizIntro;
