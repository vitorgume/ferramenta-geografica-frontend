import axios from 'axios';

export function autenticar(senha, email) {
    const loginDto = {
        email: email,
        senha: senha
    }

    return axios.post("http://localhost:8080/login", loginDto)
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao se autenticar:", err);
            return []; 
        });
}