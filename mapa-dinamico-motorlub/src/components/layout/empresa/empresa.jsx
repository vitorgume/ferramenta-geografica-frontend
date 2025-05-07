import './empresa.css';

export default function Empresa({ empresa }) {
    return (
        <div className="list-item">
            <div className={`list-item-indicator ${empresa.visitado ? 'visited' : 'not-visited'}`}></div>

            <div className="list-item-content">
                <div className="list-item-title">{empresa.nomeFantasia}</div>
                <div className="list-item-subtitle">{empresa.endereco?.logradouro || 'Endereço não informado'}</div>
                <div className="list-item-meta">
                    <span className="list-item-tag">{empresa.segmento}</span>
                    <span>{empresa.endereco?.bairro || 'Sem bairro'}</span>
                </div>
            </div>

            <div className="list-item-actions">
                <button className="icon-button" style={{ color: "var(--primary-color)" }}>
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    );
}
