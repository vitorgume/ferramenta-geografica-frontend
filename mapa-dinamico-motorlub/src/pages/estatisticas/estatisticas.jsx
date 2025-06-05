import './estatisticas.css';
import Pizza from '../../components/layout/graficos/pizza/pizza.jsx'
import HeaderMapa from '../../components/layout/headerMapa/headerMapa.jsx';
import BottomNavigate from '../../components/layout/bottomNavigate/bottomNavigate.jsx';
import { consultarMetricas } from './estatisticas.service.js';
import { useEffect, useState } from "react";

export default function Estatisticas() {
    const [metricas, setMetricas] = useState({});

    useEffect(() => {
        async function carregarMetricas(id) {
            const metricasConsultadas = await consultarMetricas(id);
            console.log('Metricas: ', metricasConsultadas);
            setMetricas(metricasConsultadas);
        }

        carregarMetricas(1);
    }, []);

    return (
        <div className='app-container'>
            <HeaderMapa />
            <div className='container-metricas'>
                <Pizza 
                    visitados={metricas.quantidadeVisitados}
                    naoVisitados={metricas.quantidadeNaoVisitados}
                />
                <div className='container-cards'>
                    <p className='visitado-text'>
                        Visitados: {metricas?.quantidadeVisitados ?? '--'}
                    </p>
                    <p className='naovisitado-text'>
                        Não visitados: {metricas?.quantidadeNaoVisitados ?? '--'}
                    </p>
                </div>
            </div>
            <BottomNavigate />
        </div>
    );
}