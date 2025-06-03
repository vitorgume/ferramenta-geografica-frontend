import './filterPanel.css';
import FilterHeader from './header/filterHeader';
import FilterGroup from './grupos/filterGroup';
import { useState } from "react";

const segmento = {
    titulo: 'Segmento',
    filtros: [
        {
            valor: 'Oficina Mecânica',
        },
        {
            valor: 'Troca de Óleo',
        },
        {
            valor: 'Pneus',
        },
        {
            valor: 'Auto Peças',
        }
    ]
}

const status = {
    titulo: 'Status',
    filtros: [
        {
            valor: 'Visitado',
        },
        {
            valor: 'Não Visitado',
        }
    ]
}

const regiao = {
    titulo: 'Região',
    filtros: [
        {
            valor: 'Norte',
        },
        {
            valor: 'Sul',
        },
        {
            valor: 'Leste'
        },
        {
            valor: 'Oeste'
        }, 
        {
            valor: 'Central'
        }
    ]
}


export default function FilterPanel({ aberto, onClose, onApplyFilters }) {

    const [filtrosSelecionados, setFiltrosSelecionados] = useState({
        segmento: [],
        status: [],
        regiao: []
    });

    function toggleFiltro(categoria, valor) {
        setFiltrosSelecionados(prev => {
            const atual = prev[categoria];
            return {
                ...prev,
                [categoria]: atual.includes(valor)
                    ? atual.filter(v => v !== valor)
                    : [...atual, valor]
            };
        });
    }

    return(
        <div className={`filters-panel ${aberto ? "expanded" : ""}`}>
            <div className="filter-handle"></div>
            <FilterHeader onClose={onClose}/>
            <div className="filters-content">
                <FilterGroup titulo="Segmento" filtros={segmento.filtros} categoria="segmento" onToggle={toggleFiltro} selecionados={filtrosSelecionados.segmento}/>
                <FilterGroup titulo="Status" filtros={status.filtros} categoria="status" onToggle={toggleFiltro} selecionados={filtrosSelecionados.status}/>
                <FilterGroup titulo="Região" filtros={regiao.filtros} categoria="regiao" onToggle={toggleFiltro} selecionados={filtrosSelecionados.regiao}/>
            </div>
            <div className="filters-actions">
                <button className="btn btn-secondary" onClick={() => setFiltrosSelecionados({ segmento: [], status: [], regiao: [] })}>Limpar</button>
                <button 
                    className="btn btn-primary" 
                    onClick={() => {
                        onApplyFilters(filtrosSelecionados);
                        onClose();
                    }}
                >Aplicar</button>
            </div>
        </div>
    );
}