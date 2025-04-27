import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/admin/AdminDashboard';
import UTMAnalyticsPage from './pages/admin/UTMAnalyticsPage';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/utm-analytics" element={<UTMAnalyticsPage />} />
        {/* Other routes will be added here */}
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
