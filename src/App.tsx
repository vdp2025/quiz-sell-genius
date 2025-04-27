import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/admin/AdminDashboard';
import UTMAnalyticsPage from './pages/admin/UTMAnalyticsPage';
import { Toaster } from './components/ui/toaster';
import QuizBuilderPage from './pages/QuizBuilderPage';
import UnifiedEditorPage from './pages/editor/UnifiedEditorPage';
import EditorResultadoPage from './pages/admin/EditorResultadoPage';
import SettingsPage from './pages/admin/SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/utm-analytics" element={<UTMAnalyticsPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/editor-unificado" element={<UnifiedEditorPage />} />
        <Route path="/admin/editor-resultado" element={<EditorResultadoPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        {/* Other routes will be added here */}
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
