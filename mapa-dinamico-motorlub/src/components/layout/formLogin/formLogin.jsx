import { useState } from 'react';
import './formLogin.css';
import { autenticar } from './formLogin.service';
import { useNavigate } from 'react-router-dom';

export default function FormLogin() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    function togglePassword() {
        const input = document.getElementById("password");
        if (input.type === "password") {
            input.type = "text";
        } else {
            input.type = "password";
        }
    }

    async function handleSubmit(e) {
        e.preventDefault(); 

        try {
            const loginResponse = await autenticar(senha, email); 

            localStorage.setItem("token", loginResponse.token);
            localStorage.setItem("id-representante", loginResponse.idRepresentante);

            navigate('/');

            alert("Login realizado com sucesso!");
        } catch (error) {
            alert("Credenciais inválidas");
            console.error(error);
        }
    }

    return (
        <>
            <form id="loginForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-input"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="password">Senha</label>
                    <div className="password-container">
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={togglePassword}
                        >
                            👁️
                        </button>
                    </div>
                </div>

                <div className="forgot-password">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            alert("Funcionalidade em desenvolvimento");
                        }}
                    >
                        Esqueceu a senha?
                    </a>
                </div>

                <button type="submit" className="login-button" id="loginBtn">
                    Entrar
                </button>
            </form>
        </>
    );
}
