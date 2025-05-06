import './bottomNavigate.css';

export default function BottomNavigate() {
    return (
        <>
            <nav class="bottom-nav">
                <a class="nav-item active" data-view="map" href="#">
                    <i class="fas fa-map-marked-alt nav-icon"></i>
                    <span>Mapa</span>
                </a>
                <a class="nav-item" data-view="list" href="#">
                    <i class="fas fa-list nav-icon"></i>
                    <span>Lista</span>
                </a>
                <a class="nav-item" href="#">
                    <i class="fas fa-chart-pie nav-icon"></i>
                    <span>Estatísticas</span>
                </a>
            </nav>
        </>
    );
}