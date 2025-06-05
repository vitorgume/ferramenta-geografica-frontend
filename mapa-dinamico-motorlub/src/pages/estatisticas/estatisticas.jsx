import './estatisticas.css';
import Pizza from '../../components/layout/graficos/pizza/pizza.jsx'
import HeaderMapa from '../../components/layout/headerMapa/headerMapa.jsx';
import BottomNavigate from '../../components/layout/bottomNavigate/bottomNavigate.jsx';

export default function Estatisticas() {
    return (
        <div className='app-container'>
            <HeaderMapa/>
            <div className='container-metricas'>
                <Pizza/>
                <div className='container-cards'>
                    <p>Visitados: 20</p>
                    <p>Não visitados: 30</p>
                </div>
            </div>
            <BottomNavigate/>
        </div>
    );
}