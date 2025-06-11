import './detalhesEmpresa.css';
import { useState, useEffect } from 'react';
import { alteraStatus } from "./detalhesEmpresa.service.js";
import { atualizarAnotacoes } from "./detalhesEmpresa.service.js";
import HeaderDetalhesEmpresa from './header/headerDetalhesEmpresa.jsx';
import { notificarSucesso, notificarErro } from '../../../utils/notificacao.js';

export default function DetalhesEmpresa({ aberto, onClose, empresa, atualizarEmpresa }) {
  const [loading, setLoading] = useState(false);
  const [anotacoes, setAnotacoes] = useState('');

  const handleToggleVisitado = async () => {
    setLoading(true);
    try {
      const updatedEmpresa = await alteraStatus(empresa.id);
      atualizarEmpresa(updatedEmpresa);
      notificarSucesso("Status empresa atualizada com sucesso !")
    } catch (err) {
      console.error('Erro ao alterar status da empresa: ', err);
      notificarErro("Problema na atualização do status !")
    } finally {
      setLoading(false);
    }
  };

  const handleSalvarAnotacoes = async () => {
    try {
      const empresaAtualizada = await atualizarAnotacoes(empresa.id, anotacoes);
      atualizarEmpresa(empresaAtualizada);
      notificarSucesso("Cometários atualizados com sucesso !")
    } catch (err) {
      console.error("Erro ao salvar anotações: ", err);
      notificarErro("Problema na atualização do comentário.")
    }
  };

  useEffect(() => {
    if (empresa) {
      console.log(empresa);
      setAnotacoes(empresa.comentario || '');
    }
  }, [empresa]);

  if (!empresa) return null;

  const enderecoFormatado = `${empresa.endereco?.logradouro}, ${empresa.endereco?.numero}, ${empresa.endereco?.municipio} - ${empresa.endereco?.uf}`;

  return (
    <div className={`detail-view ${aberto ? "active" : ""}`} id="detail-view">
      <HeaderDetalhesEmpresa onClose={onClose} />
      <div className="detail-content">
        <h3 className="detail-title">
          {empresa.nomeFantasia?.trim() ? empresa.nomeFantasia : empresa.razaoSocial}
        </h3>
        <span className="detail-segment">{empresa.segmentoDescricao}</span>
        <div className="detail-status">
          <div className="status-label">
            <div className={`status-indicator ${empresa.visitado ? "visited" : "not-visited"}`} />
            <span>{empresa.visitado ? "Visitado" : "Não visitado"}</span>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={empresa.visitado}
              onChange={handleToggleVisitado}
              disabled={loading}
            />
            <span className="slider round" />
          </label>
        </div>
        <div className="detail-info">
          <p><i className="fas fa-map-marker-alt" style={{ color: "var(--primary-color)" }} /> <span>{enderecoFormatado}</span></p>
          <p><i className="fas fa-phone" style={{ color: "var(--primary-color)" }} /> <span>{empresa.telefone}</span></p>
          <p><i className="fas fa-user" style={{ color: "var(--primary-color)" }} /> <span>{empresa.razaoSocial}</span></p>
        </div>
        <div className="detail-actions">
          <button
            className="btn btn-primary btn-block"
            onClick={handleToggleVisitado}
            disabled={loading}
          >
            <i className={`fas ${empresa.visitado ? "fa-times-circle" : "fa-check-circle"}`} />
            {empresa.visitado ? " Marcar como não visitado" : " Marcar como visitado"}
          </button>
        </div>
        <div className="comentarios-section">
          <h3>Comentários</h3>
          <textarea
            className="comentarios-textarea"
            value={anotacoes}
            onChange={(e) => setAnotacoes(e.target.value)}
            rows={6}
            placeholder="Escreva aqui suas observações sobre esta empresa..."
          />
          <button className="btn btn-primary" onClick={handleSalvarAnotacoes}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}