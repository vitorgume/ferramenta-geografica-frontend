import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapaEmpresa from './pages/mapaEmpresas/mapaEmpresa.jsx';
import Empresas from './pages/empresas/empresas.jsx';
import { LoadScript } from "@react-google-maps/api";
import Estatisticas from './pages/estatisticas/estatisticas.jsx';
import Login from './pages/login/login.jsx';
import { ToastContainer } from 'react-toastify';
import * as Sentry from "@sentry/react";


export default function App() {
  return (
    <Sentry.ErrorBoundary fallback={<p>Ocorreu um erro inesperado. Tente recarregar a página.</p>}>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Router>
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/menu" element={<MapaEmpresa />} />
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/estatisticas" element={<Estatisticas />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      </LoadScript>
    </Sentry.ErrorBoundary>
  );
}
