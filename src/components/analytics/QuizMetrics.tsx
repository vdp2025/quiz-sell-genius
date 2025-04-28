
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const QuizMetrics = () => {
  // Mock data for demonstration
  const metrics = {
    totalStarts: 642,
    completions: 523,
    completionRate: '81.5%',
    averageTime: '2m 34s',
  };

  const resultDistribution = [
    { style: 'Natural', count: 124, percentage: '23.7%' },
    { style: 'Clássico', count: 98, percentage: '18.7%' },
    { style: 'Contemporâneo', count: 87, percentage: '16.6%' },
    { style: 'Elegante', count: 76, percentage: '14.5%' },
    { style: 'Romântico', count: 65, percentage: '12.4%' },
    { style: 'Dramático', count: 44, percentage: '8.4%' },
    { style: 'Criativo', count: 29, percentage: '5.5%' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Métricas de Participação</CardTitle>
          <CardDescription>Dados de engajamento com o quiz</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="bg-[#f9f7ff] p-4 rounded-lg">
              <dt className="text-sm font-medium text-gray-500">Total de inícios</dt>
              <dd className="mt-1 text-3xl font-semibold">{metrics.totalStarts}</dd>
            </div>
            <div className="bg-[#f9f7ff] p-4 rounded-lg">
              <dt className="text-sm font-medium text-gray-500">Conclusões</dt>
              <dd className="mt-1 text-3xl font-semibold">{metrics.completions}</dd>
            </div>
            <div className="bg-[#f9f7ff] p-4 rounded-lg">
              <dt className="text-sm font-medium text-gray-500">Taxa de conclusão</dt>
              <dd className="mt-1 text-3xl font-semibold">{metrics.completionRate}</dd>
            </div>
            <div className="bg-[#f9f7ff] p-4 rounded-lg">
              <dt className="text-sm font-medium text-gray-500">Tempo médio</dt>
              <dd className="mt-1 text-3xl font-semibold">{metrics.averageTime}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Resultados</CardTitle>
          <CardDescription>Estilos atribuídos aos participantes</CardDescription>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium">Estilo</th>
                <th className="text-right py-2 font-medium">Quantidade</th>
                <th className="text-right py-2 font-medium">%</th>
              </tr>
            </thead>
            <tbody>
              {resultDistribution.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2">{item.style}</td>
                  <td className="text-right py-2">{item.count}</td>
                  <td className="text-right py-2">{item.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};
