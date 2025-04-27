
import React, { useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
// These components are commented out since they don't exist yet
// import { UTMAnalytics } from '@/components/analytics/UTMAnalytics';
// import { QuizMetrics } from '@/components/analytics/QuizMetrics';

const UTMAnalyticsPage = () => {
  useEffect(() => {
    console.log('UTMAnalyticsPage mounted');
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 bg-[#FAF9F7]">
        <h1 className="text-2xl font-playfair text-[#432818] mb-6">Métricas do Quiz</h1>
        <div className="space-y-8">
          {/* <QuizMetrics /> */}
          <div className="mt-8">
            <h2 className="text-xl font-playfair text-[#432818] mb-4">Análise de UTM</h2>
            {/* <UTMAnalytics /> */}
            <p>Em desenvolvimento</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UTMAnalyticsPage;
