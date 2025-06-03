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
    const [filtros, setFiltros] = useState(null);

    function filtrarEmpresas(empresas) {
    if (!filtros) return empresas;

    return empresas.filter(emp => {
        console.log('Empresa: ', emp);
        const segmento = emp.segmentoDescricao; 
        const status = emp.visitado ? 'Visitado' : 'Não Visitado';
        const regiao = emp.endereco?.regiao; 

        const matchSegmento = filtros.segmento.length === 0 || filtros.segmento.includes(segmento);
        const matchStatus = filtros.status.length === 0 || filtros.status.includes(status);
        const matchRegiao = filtros.regiao.length === 0 || filtros.regiao.includes(regiao);

        return matchSegmento && matchStatus && matchRegiao;
    });
}

    function handleToggleFiltro() {
        setFiltroAberto(prev => !prev);
    }

    function atualizarEmpresa(empresaAtualizada) {
        setEmpresas(empresasAntigas =>
            empresasAntigas.map(emp =>
                emp.id === empresaAtualizada.id ? empresaAtualizada : emp
            )
        );
        setEmpresaSelecionada(empresaAtualizada); 
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
                onApplyFilters={setFiltros}
            />
            <Mapa
                empresas={filtrarEmpresas(empresas)}
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