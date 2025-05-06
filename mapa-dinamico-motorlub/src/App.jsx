import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapaEmpresa from './pages/mapaEmpresas/mapaEmpresa.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapaEmpresa />}/>
      </Routes>
    </Router>
  );
}
