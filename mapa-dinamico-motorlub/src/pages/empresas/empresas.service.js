import axios from 'axios';

export function consultaEmpresas() {
    return axios.get("http://localhost:8080/empresas")
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar empresas:", err);
            return []; 
        });
}