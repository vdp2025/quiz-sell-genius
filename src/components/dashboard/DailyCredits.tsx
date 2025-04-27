
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CirclePlus, History, Award } from 'lucide-react';

interface DailyCreditsProps {
  credits: number;
  maxCredits: number;
  lastRenewal: string;
  nextRenewal: string;
}

export const DailyCredits: React.FC<DailyCreditsProps> = ({
  credits = 10,
  maxCredits = 20,
  lastRenewal = '2025-04-27',
  nextRenewal = '2025-04-28',
}) => {
  const percentage = (credits / maxCredits) * 100;

  return (
    <Card className="border-[#9b87f5] shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Award className="mr-2 h-5 w-5 text-[#9b87f5]" />
          Créditos Diários
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Créditos disponíveis</span>
            <span className="font-medium">{credits}/{maxCredits}</span>
          </div>
          
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#9b87f5]" 
              style={{ width: `${percentage}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <History className="h-3 w-3 mr-1" />
              <span>Renovado: {new Date(lastRenewal).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <CirclePlus className="h-3 w-3 mr-1" />
              <span>Próxima renovação: {new Date(nextRenewal).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyCredits;
