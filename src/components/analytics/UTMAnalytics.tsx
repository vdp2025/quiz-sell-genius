
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const UTMAnalytics = () => {
  // Mock data for analytics demonstration
  const utmSources = [
    { source: 'facebook', visits: 234, conversions: 45, rate: '19.2%' },
    { source: 'instagram', visits: 187, conversions: 32, rate: '17.1%' },
    { source: 'email', visits: 103, conversions: 27, rate: '26.2%' },
    { source: 'direct', visits: 98, conversions: 18, rate: '18.4%' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise de Tráfego</CardTitle>
        <CardDescription>Dados de fontes UTM e conversões</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 font-medium">Fonte</th>
                <th className="text-right py-3 font-medium">Visitas</th>
                <th className="text-right py-3 font-medium">Conversões</th>
                <th className="text-right py-3 font-medium">Taxa</th>
              </tr>
            </thead>
            <tbody>
              {utmSources.map((source, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 capitalize">{source.source}</td>
                  <td className="text-right py-3">{source.visits}</td>
                  <td className="text-right py-3">{source.conversions}</td>
                  <td className="text-right py-3">{source.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
