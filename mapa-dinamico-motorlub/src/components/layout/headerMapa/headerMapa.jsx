import './headerMapa.css';

export default function HeaderMapa() {
    return (
        <>
            <header className="header">
                <h1>Mapa de Locais</h1>
                <div className="header-actions">
                    <button className="icon-button" id="filter-toggle">
                        <i className="fas fa-filter"></i>
                    </button>
                    <button className="icon-button" id="search-toggle">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </header>
        </>
    );
}