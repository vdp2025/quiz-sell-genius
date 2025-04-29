import React from 'react';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface FunnelData {
  stage: string;
  count: number;
  percentage: number;
}

interface FunnelConversionChartProps {
  data: FunnelData[];
}

export function FunnelConversionChart({ data }: FunnelConversionChartProps) {
  // Gradiente de cores do funil (do mais amplo ao mais estreito)
  const colors = ['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe'];
  
  // Formatar dados para o gráfico
  const chartData = data.map((item, index) => ({
    ...item,
    // Garantir que as etapas estejam em ordem
    order: index
  }));
  
  // Renderizar rótulos de percentual
  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, height, value, index } = props;
    const percentage = data[index]?.percentage || 0;
    
    return (
      <g>
        <text 
          x={x + width / 2} 
          y={y - 15} 
          fill="#000000" 
          textAnchor="middle" 
          dominantBaseline="middle"
          className="text-xs font-medium"
        >
          {`${percentage.toFixed(1)}%`}
        </text>
      </g>
    );
  };
  
  // Configuração do tooltip personalizado
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const { stage, count, percentage } = payload[0].payload;
      
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="font-medium">{stage}</p>
          <p className="text-sm">Visualizações: <span className="font-medium">{count}</span></p>
          <p className="text-sm">Taxa de conversão: <span className="font-medium">{percentage.toFixed(1)}%</span></p>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{ top: 30, right: 20, left: 20, bottom: 20 }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis type="number" />
        <YAxis 
          dataKey="stage" 
          type="category" 
          tickLine={false}
          axisLine={false}
          width={120}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="count" 
          name="Visualizações"
          label={renderCustomizedLabel}
          radius={[0, 4, 4, 0]}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
} 