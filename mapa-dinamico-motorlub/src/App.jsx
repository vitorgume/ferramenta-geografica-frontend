import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapaEmpresa from './pages/mapaEmpresas/mapaEmpresa.jsx';
import Empresas from './pages/empresas/empresas.jsx';
import { LoadScript } from "@react-google-maps/api";
import Estatisticas from './pages/estatisticas/estatisticas.jsx';


export default function App() {  
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Router>
        <Routes>
          <Route path="/" element={<MapaEmpresa />} />
          <Route path="/empresas" element={<Empresas />} />
          <Route path="/estatisticas" element={<Estatisticas />} />
        </Routes>
      </Router>
    </LoadScript>
  );
}
