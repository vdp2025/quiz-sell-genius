import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart } from 'lucide-react';

export const UTMAnalytics: React.FC = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-[#432818] flex items-center text-lg">
            <BarChart className="w-5 h-5 mr-2 text-[#B89B7A]" />
            Fontes de Tráfego
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
            <p className="text-gray-500">Gráfico de fontes de tráfego será exibido aqui</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-[#432818] flex items-center text-lg">
            <LineChart className="w-5 h-5 mr-2 text-[#B89B7A]" />
            Conversões por UTM
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
            <p className="text-gray-500">Gráfico de conversões por UTM será exibido aqui</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 