import './searchInput.css';

export default function SearchInput({ onClose, onSearch }) {
    return (
        <div className='search-container'>
            <button className="icon-button" id="back-from-search" onClick={onClose}>
                <i className="fas fa-arrow-left"></i>
            </button>
            <input
                type="text"
                placeholder="Pesquisar local..."
                onChange={(e) => onSearch(e.target.value)}
                style={{
                    flex: "1",
                    margin: "0 10px",
                    padding: "8px",
                    borderRadius: "var(--radius)",
                    border: "none"
                }}
            />
            <button className="icon-button">
                <i className="fas fa-search"></i>
            </button>
        </div>
    );
}
