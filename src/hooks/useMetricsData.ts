import { useState, useEffect, useCallback } from 'react';
import { MetricsData, MetricEvent } from '@/types/editor';

interface UseMetricsDataReturn {
  data: MetricsData | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => void;
}

export function useMetricsData(
  fromDate: Date,
  toDate: Date,
  filters?: Record<string, any>
): UseMetricsDataReturn {
  const [data, setData] = useState<MetricsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [refreshCount, setRefreshCount] = useState<number>(0);
  
  const refresh = useCallback(() => {
    setRefreshCount(prevCount => prevCount + 1);
  }, []);
  
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);
    
    const fetchData = async () => {
      try {
        // Em um caso real, aqui seria uma chamada API para buscar os dados
        // Por enquanto, geramos dados de exemplo
        
        // Simular atraso de rede
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Dados simulados
        const mockData = generateMockData(fromDate, toDate);
        
        if (isMounted) {
          setData(mockData);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Erro desconhecido ao carregar dados'));
          setIsLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [fromDate, toDate, refreshCount, filters]);
  
  return { data, isLoading, error, refresh };
}

// Função para gerar dados simulados
function generateMockData(fromDate: Date, toDate: Date): MetricsData {
  // Funil de conversão
  const funnelStages = [
    'Visualização inicial',
    'Início do quiz',
    'Primeira resposta',
    'Quiz completo',
    'Visualização do resultado',
    'Clique na oferta'
  ];
  
  // Começar com valor alto e ir diminuindo gradualmente
  const baseVisitors = 1000 + Math.floor(Math.random() * 500);
  
  const funnelData = funnelStages.map((stage, index) => {
    // Taxa de conversão aproximada por estágio (70-95% de retenção)
    const dropoffFactor = 0.7 + (Math.random() * 0.25);
    
    // Para o primeiro estágio, use o valor base
    const prevCount = index === 0 ? baseVisitors : funnelData[index - 1].count;
    const count = index === 0 ? prevCount : Math.floor(prevCount * dropoffFactor);
    
    // Calcular porcentagem em relação ao total inicial
    const percentage = (count / baseVisitors) * 100;
    
    return { stage, count, percentage };
  });
  
  // Dados de abandono por pergunta
  const totalQuestions = 5;
  const abandonmentData = Array.from({ length: totalQuestions }, (_, i) => {
    // Distribuição desigual - algumas perguntas têm mais abandonos
    const weight = i === 2 ? 3 : i === 4 ? 2 : 1; // Pergunta 3 e 5 têm mais abandonos
    const abandonCount = Math.floor((Math.random() * 50 + 10) * weight);
    
    // Porcentagem de abandono em relação ao total de abandonos
    const totalAbandons = funnelData[0].count - funnelData[funnelData.length - 1].count;
    const percentage = (abandonCount / totalAbandons) * 100;
    
    return {
      questionNumber: i + 1,
      count: abandonCount,
      percentage
    };
  });
  
  // Dados de cliques
  const clickElements = [
    { id: 'btn_next', type: 'Botão de avançar' },
    { id: 'btn_submit', type: 'Botão de finalizar' },
    { id: 'option_a', type: 'Opção de resposta' },
    { id: 'option_b', type: 'Opção de resposta' },
    { id: 'option_c', type: 'Opção de resposta' },
    { id: 'btn_buy', type: 'Botão de compra' },
    { id: 'link_more', type: 'Link saiba mais' }
  ];
  
  const clicksData = clickElements.map(el => ({
    targetId: el.id,
    targetType: el.type,
    count: Math.floor(Math.random() * 500 + 100)
  }));
  
  return {
    funnelData,
    abandonmentData,
    clicksData
  };
}

// Em um sistema real, teríamos funções para capturar eventos
export function trackEvent(event: Omit<MetricEvent, 'id' | 'timestamp'>): void {
  // Criar um evento completo
  const completeEvent: MetricEvent = {
    id: `event_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`,
    timestamp: Date.now(),
    ...event
  };
  
  // Armazenar o evento (em um sistema real, enviaríamos para um backend)
  // Por enquanto, apenas armazenar na sessionStorage
  const storedEvents = sessionStorage.getItem('quizMetricEvents');
  const events: MetricEvent[] = storedEvents ? JSON.parse(storedEvents) : [];
  events.push(completeEvent);
  sessionStorage.setItem('quizMetricEvents', JSON.stringify(events));
  
  // Também poderíamos usar um sistema de analytics como Google Analytics, Mixpanel, etc.
  console.log('Evento registrado:', completeEvent);
}

// Função para iniciar a captura de eventos no quiz
export function setupMetricsTracking(): void {
  // Para um sistema real, poderíamos:
  // 1. Configurar listeners de eventos para cada elemento importante do quiz
  // 2. Monitorar navegação entre perguntas
  // 3. Capturar tempo de permanência em cada pergunta
  // 4. Registrar cliques em opções e botões
  
  // Exemplo simplificado:
  window.addEventListener('unload', () => {
    // Registrar evento de abandono quando o usuário fecha a página
    trackEvent({
      sessionId: getSessionId(),
      eventType: 'abandon',
      metadata: {
        location: window.location.pathname
      }
    });
  });
}

// Função auxiliar para obter ou criar um ID de sessão
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('quizSessionId');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    sessionStorage.setItem('quizSessionId', sessionId);
  }
  return sessionId;
} 