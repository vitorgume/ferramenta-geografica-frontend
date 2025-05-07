import SearchInput from '../searchInput/searchInput';
import React, { useEffect, useState } from "react";

import './headerMapa.css';

export default function HeaderMapa({ onToggleFiltro, searchAberto, onToggleSearch }) {


    return (
        <>
            <header className="header">
                {searchAberto ? (
                    <SearchInput onClose={onToggleSearch} />
                ) : (
                    <>
                        <h1>Mapa de Locais</h1>
                        <div className="header-actions">
                            <button className="icon-button" onClick={onToggleFiltro}>
                                <i className="fas fa-filter"></i>
                            </button>
                            <button className="icon-button"  onClick={onToggleSearch}>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </>
                )}
            </header>
        </>
    );
}