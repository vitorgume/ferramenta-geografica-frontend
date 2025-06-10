import { GoogleMap, Marker } from "@react-google-maps/api";
import { useState } from "react";

const mapContainerStyle = {
    width: "100%",
    height: "100vh"
};

const defaultCenter = {
    lat: -23.42126725741803,
    lng: -51.933007534991326
};

// SVGs específicos para cada segmento
const segmentSVGs = {
    'oficina mecânica': `
        <svg width="35" height="28" version="1.1" id="_x32_" 
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" 
            xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> <style type="text/css">  .st0{fill:#000000;}  </style> 
                <g> <path class="st0" 
                    d="M360.102,240.012l10.156-10.266c0,0,15.609-13.406,33.406-7.328c30.984,10.578,66.781-0.875,91.609-25.734 c7.063-7.063,15.641-21.234,15.641-21.234c0.984-1.344,1.328-3.047,0.922-4.672l-1.922-7.906c-0.359-1.484-1.313-2.75-2.625-3.531 c-1.313-0.766-2.891-0.969-4.344-0.547l-60.984,16.969c-2.266,0.625-4.688-0.219-6.063-2.109l-28.015-38.594 c-0.859-1.172-1.219-2.641-1.016-4.063l5.641-41c0.297-2.234,1.891-4.047,4.063-4.656l64.406-17.922 c2.906-0.813,4.672-3.813,3.953-6.766l-2.547-10.359c-0.344-1.469-1.281-2.719-2.563-3.5c0,0-5.047-3.344-8.719-5.234 c-36.578-18.891-82.64-13.031-113.312,17.656c-22.656,22.656-31.531,53.688-27.375,83.156c3.203,22.656,1.703,34.703-8.078,45.047 c-0.891,0.922-3.703,3.734-8.047,8L360.102,240.012z"></path> <path class="st0" d="M211.383,295.418C143.024,361.652,68.461,433.715,68.461,433.715c-2.547,2.438-4,5.797-4.047,9.313 c-0.047,3.5,1.344,6.891,3.813,9.375l31.938,31.938c2.5,2.484,5.875,3.859,9.391,3.813c3.516-0.031,6.859-1.5,9.281-4.031 l139.328-140.953L211.383,295.418z"></path> <path class="st0" d="M501.43,451.371c2.484-2.484,3.859-5.859,3.813-9.375c-0.031-3.516-1.5-6.859-4.031-9.297L227.415,166.246 l-43.953,43.969L450.805,483.09c2.438,2.547,5.781,4,9.297,4.047s6.891-1.344,9.391-3.828L501.43,451.371z"></path> <path class="st0" d="M254.196,32.621c-32.969-12.859-86.281-14.719-117.156,16.141c-24.313,24.313-59.875,59.891-59.875,59.891 c-12.672,12.656-0.906,25.219-10.266,34.563c-9.359,9.359-24.313,0-32.734,8.422L3.29,182.527c-4.391,4.375-4.391,11.5,0,15.891 l43.016,43.016c4.391,4.391,11.516,4.391,15.906,0l30.875-30.875c8.438-8.422-0.938-23.375,8.438-32.719 c12.609-12.625,26.375-10.484,34.328-2.547l15.891,15.891l17.219,4.531l43.953-43.953l-5.063-16.688 c-14.016-14.031-16.016-30.266-7.234-39.047c13.594-13.594,36.047-33.234,57.078-41.656 C271.102,49.012,267.055,35.668,254.196,32.621z M194.571,103.48c-0.063,0.047,5.859-7.281,5.969-7.375L194.571,103.48z"></path> 
                </g> 
            </g>
        </svg>
    `,
    'troca de óleo': `
        <svg width="35" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> <g> <path fill="none" d="M0 0h24v24H0z"></path> 
                <path d="M9.07 7L6 11.606V20h12V7H9.07zM8 5h11a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V11l4-6zm5-4h5a1 1 0 0 1 1 1v2h-7V2a1 1 0 0 1 1-1zM8 12h2v6H8v-6z"></path> 
            </g> 
            </g>
        </svg>
    `,
    'auto peça': `
        <svg width="35" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <path d="M3 8L5.72187 10.2682C5.90158 10.418 6.12811 10.5 6.36205 10.5H17.6379C17.8719 10.5 18.0984 10.418 18.2781 10.2682L21 8M6.5 14H6.51M17.5 14H17.51M8.16065 4.5H15.8394C16.5571 4.5 17.2198 4.88457 17.5758 5.50772L20.473 10.5777C20.8183 11.1821 21 11.8661 21 12.5623V18.5C21 19.0523 20.5523 19.5 20 19.5H19C18.4477 19.5 18 19.0523 18 18.5V17.5H6V18.5C6 19.0523 5.55228 19.5 5 19.5H4C3.44772 19.5 3 19.0523 3 18.5V12.5623C3 11.8661 3.18166 11.1821 3.52703 10.5777L6.42416 5.50772C6.78024 4.88457 7.44293 4.5 8.16065 4.5ZM7 14C7 14.2761 6.77614 14.5 6.5 14.5C6.22386 14.5 6 14.2761 6 14C6 13.7239 6.22386 13.5 6.5 13.5C6.77614 13.5 7 13.7239 7 14ZM18 14C18 14.2761 17.7761 14.5 17.5 14.5C17.2239 14.5 17 14.2761 17 14C17 13.7239 17.2239 13.5 17.5 13.5C17.7761 13.5 18 13.7239 18 14Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
            </g>
        </svg>
    `
};

const createSVGIcon = (segmentKey, isVisited) => {
    const borderColor = isVisited ? '#10B981' : '#EF4444';
    const backgroundColor = isVisited ? '#DCFCE7' : '#FEE2E2';
    const segmentSVG = segmentSVGs[segmentKey] || segmentSVGs['default'];
    
    const svg = `
        <svg width="60" height="60" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <!-- Círculo de fundo com cor baseada no status -->
            <circle cx="18" cy="18" r="16" fill="${backgroundColor}" 
                    stroke="${borderColor}" stroke-width="3"/>
            
            <!-- Ícone do segmento -->
            ${segmentSVG}
            
            <!-- Pequeno indicador no canto superior direito -->
            <circle cx="28" cy="8" r="6" fill="${borderColor}"/>
            <text x="28" y="11" text-anchor="middle" fill="white" 
                  font-family="Arial" font-size="8" font-weight="bold">
                ${isVisited ? '✓' : '!'}
            </text>
        </svg>
    `;
    
    return {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
        scaledSize: new window.google.maps.Size(36, 36),
        anchor: new window.google.maps.Point(18, 18)
    };
};


const getMarkerIcon = (empresa) => {
    const segmentoKey = empresa.segmentoDescricao ? empresa.segmentoDescricao.toLowerCase() : null;
    
    if (segmentoKey && segmentSVGs[segmentoKey]) {
        // Escolha entre createSVGIcon (circular) ou createFlatSVGIcon (pin do mapa)
        return createSVGIcon(segmentoKey, empresa.visitado || false);
    }
    
    // Ícone padrão
    const defaultSvg = `
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="#6B7280" stroke="#fff" stroke-width="2"/>
            <text x="16" y="20" text-anchor="middle" fill="white" 
                  font-family="Arial" font-size="12" font-weight="bold">?</text>
        </svg>
    `;
    
    return {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(defaultSvg)}`,
        scaledSize: new window.google.maps.Size(32, 32),
        anchor: new window.google.maps.Point(16, 16)
    };
};

export default function Mapa({ empresas, onAbrirDetalhes }) {
    const [currentCenter] = useState(defaultCenter);

    return (
        <>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={currentCenter}
                zoom={14}
            >
                {Array.isArray(empresas) && empresas.map((empresa, index) => {
                    const coords = empresa.endereco?.cordenadas;
                    if (!coords || !coords.latitude || !coords.longitude) return null;
                    
                    const lat = parseFloat(coords.latitude);
                    const lng = parseFloat(coords.longitude);
                    if (isNaN(lat) || isNaN(lng)) return null;

                    return (
                        <Marker
                            key={index}
                            position={{ lat, lng }}
                            title={`${empresa.nomeFantasia} - ${empresa.segmentoDescricao || 'Sem segmento'}${empresa.visitado !== undefined ? (empresa.visitado ? ' (Visitado)' : ' (Não visitado)') : ''}`}
                            icon={getMarkerIcon(empresa)}
                            onClick={() => onAbrirDetalhes(empresa)}
                        />
                    );
                })}
            </GoogleMap>
        </>
    );
}