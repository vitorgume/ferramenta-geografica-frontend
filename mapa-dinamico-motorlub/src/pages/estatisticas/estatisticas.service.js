import axios from 'axios';

export function consultarMetricas(id) {
    return axios.get(`http://localhost:8080/metricas/visitados/${id}`)
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar empresas:", err);
            return []; 
        });
}