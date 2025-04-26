
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import { LoadingState } from './components/ui/loading-state';
import { QuizProvider } from './context/QuizContext';
import QuizIntro from './components/QuizIntro';

// Importações lazy para melhor performance
const AdminPage = lazy(() => import('./pages/Admin'));
const SettingsPage = lazy(() => import('./pages/admin/SettingsPage'));
const ResultPageEditorPage = lazy(() => import('./pages/admin/ResultPageEditorPage'));
const UTMAnalyticsPage = lazy(() => import('./pages/admin/UTMAnalyticsPage'));
const EditorPage = lazy(() => import('./pages/admin/EditorPage'));

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin } = useAuth();
  if (!user || !isAdmin) {
    return <QuizIntro onStart={() => {}} />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <QuizProvider>
          <Router>
            <Suspense fallback={<LoadingState />}>
              <Routes>
                <Route path="/" element={<QuizIntro onStart={() => {}} />} />
                
                {/* Rotas de Administração */}
                <Route path="/admin" element={
                  <ProtectedAdminRoute>
                    <AdminPage />
                  </ProtectedAdminRoute>
                } />
                <Route path="/admin/settings" element={
                  <ProtectedAdminRoute>
                    <SettingsPage />
                  </ProtectedAdminRoute>
                } />
                <Route path="/admin/resultado-editor" element={
                  <ProtectedAdminRoute>
                    <ResultPageEditorPage />
                  </ProtectedAdminRoute>
                } />
                <Route path="/admin/utm-analytics" element={
                  <ProtectedAdminRoute>
                    <UTMAnalyticsPage />
                  </ProtectedAdminRoute>
                } />
                <Route path="/admin/quiz-builder" element={
                  <ProtectedAdminRoute>
                    <EditorPage />
                  </ProtectedAdminRoute>
                } />
              </Routes>
            </Suspense>
          </Router>
          <Toaster />
        </QuizProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
