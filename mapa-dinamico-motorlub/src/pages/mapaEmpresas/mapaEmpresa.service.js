import api from '../../utils/axios.js';

export function consultaEmpresas(id) {
    console.log('Id requisição: ', id);

    return api.get(`/empresas/${id}`)
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar empresas:", err);
            return []; 
        });
}