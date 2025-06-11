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

const icpSVGs = {
    'a+': `<text x="18" y="24" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#2d5016" text-anchor="middle">A+</text>`,
    'b+': `<text x="18" y="24" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#4a7c59" text-anchor="middle">B+</text>`,
    'c+': `<text x="18" y="24" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#8b6914" text-anchor="middle">C+</text>`,
    'a': `<text x="18" y="24" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#2d5016" text-anchor="middle">A</text>`,
    'b': `<text x="18" y="24" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#4a7c59" text-anchor="middle">B</text>`,
    'c': `<text x="18" y="24" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#8b6914" text-anchor="middle">C</text>`,
    'a-': `<text x="18" y="24" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#2d5016" text-anchor="middle">A-</text>`,
    'b-': `<text x="18" y="24" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#4a7c59" text-anchor="middle">B-</text>`,
    'c-': `<text x="18" y="24" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#8b6914" text-anchor="middle">C-</text>`
};

const createSVGIcon = (segmentKey, isVisited) => {
    const borderColor = isVisited ? '#10B981' : '#EF4444';
    const backgroundColor = isVisited ? '#DCFCE7' : '#FEE2E2';
    const segmentSVG = icpSVGs[segmentKey] || icpSVGs['default'];

    const svg = `
        <svg width="60" height="60" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" fill="${backgroundColor}" stroke="${borderColor}" stroke-width="3"/>
                ${segmentSVG}
            <circle cx="28" cy="8" r="6" fill="${borderColor}"/>
            <text x="28" y="11" text-anchor="middle" fill="white" font-family="Arial" font-size="8" font-weight="bold">
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
    const icpKey = empresa.descricaoNivelIcp ? empresa.descricaoNivelIcp.toLowerCase() : null;


    if (icpKey && icpSVGs[icpKey]) {
        const icon = createSVGIcon(icpKey, empresa.visitado || false);
        return icon;
    }

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