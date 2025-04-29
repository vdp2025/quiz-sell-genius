import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FunnelConversionChart } from './charts/FunnelConversionChart';
import { AbandonmentChart } from './charts/AbandonmentChart';
import { ClicksChart } from './charts/ClicksChart';
import { DateRangePicker } from './DateRangePicker';
import { MetricsData } from '@/types/editor';
import { useMetricsData } from '@/hooks/useMetricsData';
import { RefreshCw, Download, Filter, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function MetricsPanel() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Últimos 7 dias
    to: new Date()
  });
  
  const [activeTab, setActiveTab] = useState<string>('funnel');
  const { data, isLoading, refresh } = useMetricsData(dateRange.from, dateRange.to);
  
  const handleExportData = () => {
    // Exportar dados como CSV
    if (!data) return;
    
    const csvContent = generateCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `metricas-quiz-${formatDate(dateRange.from)}-a-${formatDate(dateRange.to)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const generateCSV = (data: MetricsData): string => {
    let csv = '';
    
    // Cabeçalho
    switch (activeTab) {
      case 'funnel':
        csv = 'Etapa,Visualizações,Porcentagem\n';
        data.funnelData.forEach(item => {
          csv += `${item.stage},${item.count},${item.percentage.toFixed(2)}%\n`;
        });
        break;
      case 'abandonment':
        csv = 'Pergunta,Abandonos,Porcentagem\n';
        data.abandonmentData.forEach(item => {
          csv += `Pergunta ${item.questionNumber},${item.count},${item.percentage.toFixed(2)}%\n`;
        });
        break;
      case 'clicks':
        csv = 'Elemento,Tipo,Cliques\n';
        data.clicksData.forEach(item => {
          csv += `${item.targetId},${item.targetType},${item.count}\n`;
        });
        break;
    }
    
    return csv;
  };
  
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };
  
  const getCardSummary = () => {
    if (!data) return { title: 'Carregando...', value: '-', change: null };
    
    switch (activeTab) {
      case 'funnel': {
        const startCount = data.funnelData[0]?.count || 0;
        const endCount = data.funnelData[data.funnelData.length - 1]?.count || 0;
        const conversionRate = startCount ? (endCount / startCount) * 100 : 0;
        return {
          title: 'Taxa de Conversão',
          value: `${conversionRate.toFixed(1)}%`,
          change: null
        };
      }
      case 'abandonment': {
        const totalAbandons = data.abandonmentData.reduce((sum, item) => sum + item.count, 0);
        const highestAbandon = [...data.abandonmentData].sort((a, b) => b.count - a.count)[0];
        return {
          title: 'Total de Abandonos',
          value: totalAbandons.toString(),
          detail: highestAbandon ? `Pico na pergunta ${highestAbandon.questionNumber}` : null
        };
      }
      case 'clicks': {
        const totalClicks = data.clicksData.reduce((sum, item) => sum + item.count, 0);
        const mostClicked = [...data.clicksData].sort((a, b) => b.count - a.count)[0];
        return {
          title: 'Total de Cliques',
          value: totalClicks.toString(),
          detail: mostClicked ? `Mais clicado: ${mostClicked.targetType}` : null
        };
      }
      default:
        return { title: 'Dados', value: '-', change: null };
    }
  };
  
  const summary = getCardSummary();
  
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50">
      <div className="border-b bg-white p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold">Painel de Métricas</h1>
            <p className="text-sm text-gray-500">
              Visualize métricas de conversão e comportamento do quiz
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <DateRangePicker
              from={dateRange.from}
              to={dateRange.to}
              onSelect={setDateRange}
            />
            
            <Button
              variant="outline"
              size="sm"
              onClick={refresh}
              disabled={isLoading}
              title="Atualizar dados"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportData}
              disabled={!data || isLoading}
              title="Exportar dados (CSV)"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <Tabs defaultValue="funnel" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="funnel">Funil de Conversão</TabsTrigger>
            <TabsTrigger value="abandonment">Abandono</TabsTrigger>
            <TabsTrigger value="clicks">Cliques</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{summary.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.value}</div>
              {summary.detail && (
                <p className="text-xs text-gray-500 mt-1">{summary.detail}</p>
              )}
            </CardContent>
          </Card>
          
          <Card className="md:col-span-3">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium text-gray-500">
                  {activeTab === 'funnel' && 'Visão Geral do Funil'}
                  {activeTab === 'abandonment' && 'Taxas de Abandono por Pergunta'}
                  {activeTab === 'clicks' && 'Distribuição de Cliques'}
                </CardTitle>
                <CardDescription className="text-xs">
                  {activeTab === 'funnel' && 'Visualize as etapas do funil de conversão'}
                  {activeTab === 'abandonment' && 'Identifique em quais perguntas os usuários abandonam o quiz'}
                  {activeTab === 'clicks' && 'Analise quais elementos recebem mais interações'}
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4 mr-1" /> Filtrar
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px] w-full">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-400">Carregando dados...</p>
                  </div>
                ) : !data ? (
                  <div className="h-full flex flex-col items-center justify-center">
                    <Info className="w-8 h-8 text-gray-300 mb-2" />
                    <p className="text-gray-400">Nenhum dado disponível para o período selecionado</p>
                  </div>
                ) : (
                  <>
                    {activeTab === 'funnel' && <FunnelConversionChart data={data.funnelData} />}
                    {activeTab === 'abandonment' && <AbandonmentChart data={data.abandonmentData} />}
                    {activeTab === 'clicks' && <ClicksChart data={data.clicksData} />}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Estatísticas detalhadas - seriam adicionadas aqui */}
      </div>
    </div>
  );
} 