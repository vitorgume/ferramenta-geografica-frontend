import FormLogin from '../../components/layout/formLogin/formLogin';
import './login.css';

export default function Login() {
    return (
        <div className='login-page'>
            <div className='login-container'>
                <div className="header-login">
                    <h1 className="title">Mapa de Locais</h1>
                    <p className="subtitle">Faça login para continuar</p>
                </div>

                <FormLogin />
            </div>
        </div>
    );
}