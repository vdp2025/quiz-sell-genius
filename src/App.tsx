import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import { LoadingState } from './components/ui/loading-state';
import { QuizProvider } from './context/QuizContext';
import Index from './pages/Index';
import ResultPage from './pages/ResultPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import QuizBuilderPage from './pages/QuizBuilderPage';
import QuizBuilderSimplePage from './pages/QuizBuilderSimplePage';
import EditorPage from './pages/EditorPage';
import LovableEditorPage from './pages/LovableEditorPage';

// Componente para rotas protegidas administrativas
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Aqui você pode verificar se o usuário está autenticado e é um administrador
  // Por enquanto, apenas renderizamos diretamente para fins de desenvolvimento
  const isAdmin = true; // Implementar lógica real de verificação
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <QuizProvider>
        <Router>
          <Suspense fallback={<LoadingState />}>
            <Routes>
              {/* Rotas públicas */}
              <Route path="/" element={<Index />} />
              <Route path="/resultado" element={<ResultPage />} />
              
              {/* Rotas de editor */}
              <Route path="/editor" element={<EditorPage />} />
              <Route path="/editor/:style" element={<EditorPage />} />
              <Route path="/lovable-editor" element={<LovableEditorPage />} />
              <Route path="/lovable-editor/:style" element={<LovableEditorPage />} />
              
              {/* Rotas administrativas protegidas */}
              <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
              <Route path="/admin/quiz-builder" element={<ProtectedAdminRoute><QuizBuilderPage /></ProtectedAdminRoute>} />
              <Route path="/admin/quiz-builder-simple" element={<ProtectedAdminRoute><QuizBuilderSimplePage /></ProtectedAdminRoute>} />
            </Routes>
          </Suspense>
          <Toaster />
        </Router>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
