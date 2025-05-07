import HeaderMapa from "../../components/layout/headerMapa/headerMapa.jsx";
import Mapa from "../../components/layout/mapa/mapa.jsx";
import BottomNavigate from "../../components/layout/bottomNavigate/bottomNavigate.jsx";
import FilterPanel from "../../components/layout/filterPanel/filterPanel.jsx";
import DetalhesEmpresa from "../../components/layout/detalhesEmpresa/detalhesEmpresa.jsx";
import './mapaEmpresa.css';
import { consultaEmpresas } from "./mapaEmpresa.service.js";
import React, { useEffect, useState } from "react";

export default function MapaEmpresa() {

    const [empresas, setEmpresas] = useState([]);
    const [filtroAberto, setFiltroAberto] = useState(false);
    const [searchAberto, setSearchAberto] = useState(false);
    const [detalhesEmpresaAberto, setDetalhesEmpresaAberto] = useState(false);
    const [empresaSelecionada, setEmpresaSelecionada] = useState(null);


    function handleToggleFiltro() {
        setFiltroAberto(prev => !prev);
    }

    function atualizarEmpresa(empresaAtualizada) {
        setEmpresas(empresasAntigas =>
            empresasAntigas.map(emp =>
                emp.id === empresaAtualizada.id ? empresaAtualizada : emp
            )
        );
        setEmpresaSelecionada(empresaAtualizada); // atualiza também no painel de detalhes
    }
    

    useEffect(() => {
        async function carregarEmpresas() {
            const empresasConsulta = await consultaEmpresas();
            setEmpresas(empresasConsulta);
        }

        carregarEmpresas();
    }, []);

    return (
        <div className="app-container">
            <HeaderMapa
                onToggleFiltro={handleToggleFiltro}
                onToggleSearch={() => setSearchAberto(!searchAberto)}
                searchAberto={searchAberto}
            />
            <FilterPanel
                aberto={filtroAberto}
                onClose={() => setFiltroAberto(false)}
            />
            <Mapa
                empresas={empresas}
                onAbrirDetalhes={(empresa) => {
                    setEmpresaSelecionada(empresa);
                    setDetalhesEmpresaAberto(true);
                }}
            />
            <DetalhesEmpresa
                aberto={detalhesEmpresaAberto}
                onClose={() => setDetalhesEmpresaAberto(false)}
                empresa={empresaSelecionada}
                atualizarEmpresa={atualizarEmpresa}
            />
            <BottomNavigate />
        </div>
    );
} 