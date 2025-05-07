import './filterPanel.css';

export default function FilterPanel({ aberto, onClose  }) {
    return(
        <div className={`filters-panel ${aberto ? "expanded" : ""}`}>
            <div className="filter-handle" id="filter-handle"></div>
            <div className="filters-header">
                <h2>Filtros</h2>
                <button className="icon-button" 
                        id="close-filters" 
                        style={{color: "var(--text-color)"}}
                        onClick={onClose}
                >
                    <i className="fas fa-times"></i>
                </button>
            </div>
            <div className="filters-content">
                <div className="filter-group">
                    <h3>Segmento</h3>
                    <div className="filter-options">
                        <span className="filter-chip" data-filter="segment" data-value="oficina">Oficina Mecânica</span>
                        <span className="filter-chip" data-filter="segment" data-value="oleo">Troca de Óleo</span>
                        <span className="filter-chip" data-filter="segment" data-value="pneus">Pneus</span>
                        <span className="filter-chip" data-filter="segment" data-value="auto-pecas">Auto Peças</span>
                    </div>
                </div>
                <div className="filter-group">
                    <h3>Status</h3>
                    <div className="filter-options">
                        <span className="filter-chip" data-filter="status" data-value="visited">Visitado</span>
                        <span className="filter-chip" data-filter="status" data-value="not-visited">Não Visitado</span>
                    </div>
                </div>
                <div className="filter-group">
                    <h3>Região</h3>
                    <div className="filter-options">
                        <span className="filter-chip" data-filter="region" data-value="north">Norte</span>
                        <span className="filter-chip" data-filter="region" data-value="south">Sul</span>
                        <span className="filter-chip" data-filter="region" data-value="east">Leste</span>
                        <span className="filter-chip" data-filter="region" data-value="west">Oeste</span>
                        <span className="filter-chip" data-filter="region" data-value="central">Central</span>
                    </div>
                </div>
            </div>
            <div className="filters-actions">
                <button className="btn btn-secondary" id="reset-filters">Limpar</button>
                <button 
                    className="btn btn-primary" 
                    id="apply-filters"
                    onClick={onClose}
                >Aplicar</button>
            </div>
        </div>
    );
}