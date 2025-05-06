import axios from 'axios';

function consultaEmpresas() {
    axios.get("http://localhost:8080/empresas")
        .then(response => {
            const empresas = response.data;
            return empresas;
        })
        .catch(err => console.error("Erro ao carregar empresas:", err));
}

export default { consultaEmpresas };