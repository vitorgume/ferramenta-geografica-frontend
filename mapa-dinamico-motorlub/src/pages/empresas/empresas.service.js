import api from '../../utils/axios';

export function consultaEmpresas() {
    return api.get("/empresas")
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar empresas:", err);
            return []; 
        });
}