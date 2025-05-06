import HeaderMapa from "../../components/layout/headerMapa/headerMapa.jsx";
import Mapa from "../../components/layout/mapa/mapa.jsx";
import BottomNavigate from "../../components/layout/bottomNavigate/bottomNavigate.jsx";
import './mapaEmpresa.css';
import service from "./mapaEmpresa.service.js"
import React, { useEffect, useState } from "react";

export default function MapaEmpresa() {
    const [empresas, setEmpresas] = useState([]);

    useEffect(() => {
        const empresasConsulta = service.consultaEmpresas();
        setEmpresas(empresasConsulta);
    }, []);

    return (
        <div className="app-container">
            <HeaderMapa/>
            <Mapa empresas={empresas}/>
            <BottomNavigate/>
        </div>
    );
} 