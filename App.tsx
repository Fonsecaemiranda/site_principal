
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WhatsAppModalProvider } from './contexts/WhatsAppModalContext';
import WhatsAppModal from './components/WhatsAppModal';
import HomePage from './pages/HomePage';
import AreaDetailPage from './pages/AreaDetailPage';
import AreasOverviewPage from './pages/AreasOverviewPage';
import { captureUTMs, trackUTMEvent } from './utils/utm';

const App: React.FC = () => {
  useEffect(() => {
    captureUTMs();
    trackUTMEvent('page_view', { page: window.location.pathname });
  }, []);

  return (
    <div className="min-h-screen selection:bg-[#f5a623] selection:text-white">
      <WhatsAppModalProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Overview de Áreas */}
            <Route path="/areas-de-atuacao" element={<AreasOverviewPage />} />

            {/* Rotas SEO-friendly — Manaus */}
            <Route path="/advogado-previdenciario-manaus" element={<AreaDetailPage />} />
            <Route path="/advogado-bancario-manaus" element={<AreaDetailPage />} />
            <Route path="/advogado-consumidor-manaus" element={<AreaDetailPage />} />

            {/* Rotas SEO-friendly — Maués */}
            <Route path="/advogado-previdenciario-maues" element={<AreaDetailPage />} />
            <Route path="/advogado-bancario-maues" element={<AreaDetailPage />} />
            <Route path="/advogado-consumidor-maues" element={<AreaDetailPage />} />

            {/* Rotas SEO-friendly — Nova Olinda do Norte */}
            <Route path="/advogado-previdenciario-nova-olinda-do-norte" element={<AreaDetailPage />} />
            <Route path="/advogado-bancario-nova-olinda-do-norte" element={<AreaDetailPage />} />
            <Route path="/advogado-consumidor-nova-olinda-do-norte" element={<AreaDetailPage />} />

            {/* Rotas SEO-friendly — Careiro */}
            <Route path="/advogado-previdenciario-careiro" element={<AreaDetailPage />} />
            <Route path="/advogado-bancario-careiro" element={<AreaDetailPage />} />
            <Route path="/advogado-consumidor-careiro" element={<AreaDetailPage />} />

            {/* Redirects das rotas antigas */}
            <Route path="/areas/previdenciario" element={<Navigate to="/advogado-previdenciario-manaus" replace />} />
            <Route path="/areas/bancario" element={<Navigate to="/advogado-bancario-manaus" replace />} />
            <Route path="/areas/consumidor" element={<Navigate to="/advogado-consumidor-manaus" replace />} />

            {/* Fallback genérico */}
            <Route path="/areas/:slug" element={<AreaDetailPage />} />
          </Routes>
        </Router>
        <WhatsAppModal />
      </WhatsAppModalProvider>
    </div>
  );
};

export default App;
