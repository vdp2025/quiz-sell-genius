import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, TrendingUp, Users } from 'lucide-react';

export const QuizMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-[#432818] flex items-center text-lg">
            <Users className="w-5 h-5 mr-2 text-[#B89B7A]" />
            Total de Participantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-[#432818]">1,248</div>
          <div className="text-sm text-green-600 flex items-center mt-1">
            <TrendingUp className="w-4 h-4 mr-1" />
            +12.5% último mês
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-[#432818] flex items-center text-lg">
            <PieChart className="w-5 h-5 mr-2 text-[#B89B7A]" />
            Taxa de Conclusão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-[#432818]">76%</div>
          <div className="text-sm text-green-600 flex items-center mt-1">
            <TrendingUp className="w-4 h-4 mr-1" />
            +4.2% último mês
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-[#432818] flex items-center text-lg">
            <TrendingUp className="w-5 h-5 mr-2 text-[#B89B7A]" />
            Taxa de Conversão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-[#432818]">24%</div>
          <div className="text-sm text-green-600 flex items-center mt-1">
            <TrendingUp className="w-4 h-4 mr-1" />
            +2.8% último mês
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 