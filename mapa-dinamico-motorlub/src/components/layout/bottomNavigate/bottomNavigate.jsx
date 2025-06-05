import './bottomNavigate.css';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNavigate() {
    const location = useLocation();

    return (
        <div className='bottom-navigate'>
            <nav className="bottom-nav">

                <Link
                    to="/"
                    className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
                >
                    <i className="fas fa-map-marked-alt nav-icon"></i>
                    <span>Mapa</span>
                </Link>

                <Link
                    to="/empresas"
                    className={`nav-item ${location.pathname === '/empresas' ? 'active' : ''}`}
                >
                    <i className="fas fa-list nav-icon"></i>
                    <span>Lista</span>
                </Link>

                <Link
                    to="/estatisticas"
                    className={`nav-item ${location.pathname === '/estatisticas' ? 'active' : ''}`}
                >
                    <i className="fas fa-chart-pie nav-icon"></i>
                    <span>Estatísticas</span>
                </Link>
            </nav>
        </div>
    );
}