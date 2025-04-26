
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import { LoadingState } from './components/ui/loading-state';
import { QuizProvider } from './context/QuizContext';
import QuizIntro from './components/QuizIntro';

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin } = useAuth();
  if (!user || !isAdmin) {
    return <Route path="/" element={<QuizIntro onStart={() => {}} />} />;
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
