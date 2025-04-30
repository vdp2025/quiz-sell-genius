import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedAdminRoute } from './components/admin/ProtectedAdminRoute';
import AdminLayout from './components/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import TemplatesPage from './pages/admin/TemplatesPage';
import SettingsPage from './pages/admin/SettingsPage';
import EditorPage from './pages/EditorPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rota padrão */}
          <Route path="/" element={<Navigate to="/admin" replace />} />

          {/* Rotas administrativas protegidas */}
          <Route path="/admin" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/templates" element={<TemplatesPage />} />
            <Route path="/admin/settings" element={<SettingsPage />} />
          </Route>

          {/* Rota do editor */}
          <Route path="/editor/:id" element={<EditorPage />} />

          {/* Rota 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
