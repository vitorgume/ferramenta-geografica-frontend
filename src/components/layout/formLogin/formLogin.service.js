import axios from 'axios';

export function autenticar(senha, telefone) {
    const loginDto = {
        telefone: telefone,
        senha: senha
    }

    const baseURL = import.meta.env.BASE_URL;

    return axios.post(`${baseURL}/login`, loginDto)
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao se autenticar:", err);
            throw err; 
        });
}