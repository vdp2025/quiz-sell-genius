import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleUser, Clock } from 'lucide-react';

export const DailyCredits: React.FC = () => {
  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-[#432818] flex items-center text-lg">
          <CircleUser className="w-5 h-5 mr-2 text-[#9b87f5]" />
          Créditos Diários
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-3xl font-bold text-[#432818]">17/30</div>
            <div className="text-sm text-gray-500 flex items-center mt-1">
              <Clock className="w-4 h-4 mr-1" />
              Renovação em 7h 43min
            </div>
          </div>
          <div className="w-20 h-20 rounded-full border-4 border-[#9b87f5] flex items-center justify-center">
            <span className="text-xl font-bold text-[#9b87f5]">56%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 