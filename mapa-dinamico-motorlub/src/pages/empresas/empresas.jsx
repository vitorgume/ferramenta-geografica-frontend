import Empresa from "../../components/layout/empresa/empresa.jsx";

import React, { useEffect, useState } from "react";
import { consultaEmpresas } from "./empresas.service.js";
import {  useNavigate } from 'react-router-dom';

import './empresas.css';


export default function Empresas() {
    const [empresas, setEmpresas] = useState([]);

    const navigate = useNavigate();

    function handleClose() {
        navigate('/'); 
    }

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
                    <Empresa key={index} empresa={empresa} />
                ))}
            </div>
        </div>
    );
}