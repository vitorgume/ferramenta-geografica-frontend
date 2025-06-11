import './filterGroup.css';
import Filtro from './filtro/filtro';

export default function FilterGroup({titulo, filtros, categoria, onToggle, selecionados}) {
    return (
        <div className="filter-group">
            <h3>{titulo}</h3>
            <div className="filter-options">
                
                {filtros.map(filtro => {
                    return <Filtro 
                        key={filtro.valor}
                        valor={filtro.valor}
                        className={`filter-chip ${selecionados.includes(filtro.valor) ? 'active' : ''}`}
                        onClick={() => onToggle(categoria, filtro.valor)}
                    />;
                })}
            </div>
        </div>
    );
}