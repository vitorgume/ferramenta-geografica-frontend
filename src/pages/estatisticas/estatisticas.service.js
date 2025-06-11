import api from '../../utils/axios'; 

export function consultarMetricas(id) {
    return api.get(`metricas/visitados/${id}`)
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar empresas:", err);
            return []; 
        });
}