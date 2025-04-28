
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { QuizProvider } from "./context/QuizContext";
import { TooltipProvider } from "./components/ui/tooltip";
import Index from "./pages/Index";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <TooltipProvider>
      <QuizProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/resultado" element={<ResultPage />} />
          </Routes>
          <Toaster />
        </Router>
      </QuizProvider>
    </TooltipProvider>
  );
}

export default App;
