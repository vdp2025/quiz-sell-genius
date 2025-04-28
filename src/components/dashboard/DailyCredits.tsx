
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface DailyCreditsProps {
  credits: number;
  maxCredits: number;
  lastRenewal: string;
  nextRenewal: string;
}

export const DailyCredits: React.FC<DailyCreditsProps> = ({
  credits,
  maxCredits,
  lastRenewal,
  nextRenewal
}) => {
  const percentage = (credits / maxCredits) * 100;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Créditos diários</h3>
        <span className="text-sm text-gray-500">
          {credits} de {maxCredits}
        </span>
      </div>
      
      <Progress value={percentage} className="h-2 mb-4" />
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>Última renovação: {formatDate(lastRenewal)}</span>
        <span>Próxima renovação: {formatDate(nextRenewal)}</span>
      </div>
    </div>
  );
};
