import './HeaderDetalhesEmpresa.css';

export default function HeaderDetalhesEmpresa({ onClose }) {
    return (
        <div className="detail-header">
          <div className="detail-back" onClick={onClose}>
            <i className="fas fa-arrow-left"></i>
          </div>
          <h2>Detalhes do Local</h2>
        </div>
    );
}