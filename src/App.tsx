
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "./components/ui/toaster";
import { LoadingState } from "./components/ui/loading-state";
import { QuizProvider } from "./context/QuizContext";
import { TooltipProvider } from "./components/ui/tooltip";
import Index from "./pages/Index";
import ResultPage from "./pages/ResultPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import QuizBuilderPage from "./pages/QuizBuilderPage";
import UnifiedEditorPage from "./pages/UnifiedEditorPage";

function App() {
  return (
    <TooltipProvider>
      <QuizProvider>
        <Router>
          <Suspense fallback={<LoadingState />}>
            <Routes>
              {/* Public quiz routes */}
              <Route path="/" element={<Index />} />
              <Route path="/resultado" element={<ResultPage />} />
              
              {/* Admin routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
              <Route path="/admin/editor" element={<UnifiedEditorPage />} />
            </Routes>
          </Suspense>
          <Toaster />
        </Router>
      </QuizProvider>
    </TooltipProvider>
  );
}

export default App;
