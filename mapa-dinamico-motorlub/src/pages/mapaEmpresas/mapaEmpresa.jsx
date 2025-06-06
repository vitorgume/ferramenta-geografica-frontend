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
    const [termoBusca, setTermoBusca] = useState("");

    function filtrarEmpresas(empresas) {
        if (!filtros && !termoBusca) return empresas;

        return empresas.filter(emp => {
            const segmento = emp.segmento?.descricao;
            const status = emp.visitado ? 'Visitado' : 'Não Visitado';
            const regiao = emp.endereco?.regiao;
            const nome = emp.nomeFantasia?.toLowerCase() || '';

            const matchSegmento = !filtros || filtros.segmento.length === 0 || filtros.segmento.includes(segmento);
            const matchStatus = !filtros || filtros.status.length === 0 || filtros.status.includes(status);
            const matchRegiao = !filtros || filtros.regiao.length === 0 || filtros.regiao.includes(regiao);
            const matchBusca = nome.includes(termoBusca.toLowerCase());

            return matchSegmento && matchStatus && matchRegiao && matchBusca;
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
                onSearch={setTermoBusca}
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