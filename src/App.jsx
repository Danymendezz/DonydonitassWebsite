import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import AdminPage from '@/pages/AdminPage';

function App() {
  return (
    <Router
      // ✅ AÑADIDO: Prop 'future' para habilitar las próximas características de v7
      future={{ 
        v7_startTransition: true, 
        v7_relativeSplatPath: true 
      }}
    >
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;