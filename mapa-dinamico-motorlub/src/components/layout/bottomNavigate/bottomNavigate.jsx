import './bottomNavigate.css';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNavigate() {
    const location = useLocation();

    return (
        <>
            <nav className="bottom-nav">
                <a className="nav-item active" data-view="map" href="#">
                    <i className="fas fa-map-marked-alt nav-icon"></i>
                    <span>Mapa</span>
                </a>
                <Link
                    to="/empresas"
                    className={`nav-item ${location.pathname === '/empresas' ? 'active' : ''}`}
                >
                    <i className="fas fa-list nav-icon"></i>
                    <span>Lista</span>
                </Link>
                <a className="nav-item" href="#">
                    <i className="fas fa-chart-pie nav-icon"></i>
                    <span>Estatísticas</span>
                </a>
            </nav>
        </>
    );
}