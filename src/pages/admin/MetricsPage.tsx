import React, { useEffect } from 'react';
import { MetricsPanel } from '@/components/metrics/MetricsPanel';
import { useEventTracking } from '@/hooks/useEventTracking';
import { setupMetricsTracking } from '@/hooks/useMetricsData';
import { AdminLayout } from '@/components/admin/AdminLayout';

export function MetricsPage() {
  // Inicializar rastreamento de eventos
  const eventTracking = useEventTracking();
  
  // Configurar rastreamento quando o componente montar
  useEffect(() => {
    setupMetricsTracking();
    
    // Registrar visualização da página de métricas
    eventTracking.trackPageView();
  }, [eventTracking]);
  
  return (
    <AdminLayout title="Painel de Métricas">
      <MetricsPanel />
    </AdminLayout>
  );
}

export default MetricsPage; 