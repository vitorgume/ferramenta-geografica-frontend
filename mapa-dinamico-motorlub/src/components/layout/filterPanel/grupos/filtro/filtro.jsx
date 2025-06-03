import './filtro.css';

export default function Filtro({ valor, onClick, className }) {
    return (
        <span className={className} onClick={onClick}>
            {valor}
        </span>
    );
}