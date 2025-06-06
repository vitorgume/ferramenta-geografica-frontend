import api from '../../utils/axios.js';

export function consultaEmpresas(id) {
    return api.get(`/empresas/${id}`)
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar empresas:", err);
            return []; 
        });
}