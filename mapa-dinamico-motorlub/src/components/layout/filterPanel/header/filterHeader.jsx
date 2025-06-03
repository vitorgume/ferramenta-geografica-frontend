import './filterHeader.css';

export default function FilterHeader({onClose}) {
    return (
        <div className="filters-header">
            <h2>Filtros</h2>
            <button className="icon-button"
                id="close-filters"
                style={{ color: "var(--text-color)" }}
                onClick={onClose}
            >
                <i className="fas fa-times"></i>
            </button>
        </div>
    )
}