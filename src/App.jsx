// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';

// Páginas
import HomePage from './pages/HomePage';
import RoutesPage from './pages/RoutesPage';
import ContactsPage from './pages/ContactsPage';
import ResourcesPage from './pages/ResourcesPage';
import RightsPage from './pages/RightsPage';
import EmergencyPage from './pages/EmergencyPage';
import HelpPage from './pages/HelpPage';
import NotFoundPage from './pages/NotFoundPage';

// Contextos
import { LanguageProvider } from './context/LanguageContext';

// Componente App principal
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rutas" element={<RoutesPage />} />
            <Route path="/contactos" element={<ContactsPage />} />
            <Route path="/recursos" element={<ResourcesPage />} />
            <Route path="/derechos" element={<RightsPage />} />
            <Route path="/emergencia" element={<EmergencyPage />} />
            <Route path="/ayuda" element={<HelpPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;