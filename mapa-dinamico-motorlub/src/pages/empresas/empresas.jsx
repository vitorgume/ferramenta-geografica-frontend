import Empresa from "../../components/layout/empresa/empresa.jsx";

import { useEffect, useState } from "react";
import { consultaEmpresas } from "./empresas.service.js";
import { useNavigate } from 'react-router-dom';
import './empresas.css';


export default function Empresas() {
    const [empresas, setEmpresas] = useState([]);
    const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
    const [detalhesEmpresaAberto, setDetalhesEmpresaAberto] = useState(false);

    const navigate = useNavigate();

    function handleClose() {
        navigate('/');
    }

    function atualizarEmpresa(empresaAtualizada) {
        setEmpresas(empresasAntigas =>
            empresasAntigas.map(emp =>
                emp.id === empresaAtualizada.id ? empresaAtualizada : emp
            )
        );
        setEmpresaSelecionada(empresaAtualizada);
    }

    useEffect(() => {
        if (detalhesEmpresaAberto) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [detalhesEmpresaAberto]);

    useEffect(() => {
        async function carregarEmpresas() {
            const empresasConsulta = await consultaEmpresas();
            setEmpresas(empresasConsulta);
        }

        carregarEmpresas();
    }, []);

    return (
        <div>
            <div className="list-header">
                <h2>Lista de Locais</h2>
                <button className="icon-button" id="close-list" onClick={handleClose}>
                    <i className="fas fa-times"></i>
                </button>
            </div>
            <div className="list-content" id="list-content">
                {empresas.map((empresa, index) => (
                    <Empresa
                        key={index}
                        empresa={empresa}
                        detalhesEmpresaAberto={detalhesEmpresaAberto}
                        atualizarEmpresa={atualizarEmpresa}
                        empresaSelecionada={empresaSelecionada}
                        setDetalhesEmpresaAberto={setDetalhesEmpresaAberto}
                        setEmpresaSelecionada={setEmpresaSelecionada}
                    />
                ))}
            </div>
        </div>
    );
}