import { GoogleMap, Marker } from "@react-google-maps/api";
import { useState } from "react";

const mapContainerStyle = {
    width: "100%",
    height: "100vh"
}

const defaultCenter = {
    lat: -23.42126725741803,
    lng: -51.933007534991326
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
                            title={empresa.nomeFantasia}
                            icon={
                                empresa.visitado
                                    ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                                    : "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                            }
                            onClick={() => onAbrirDetalhes(empresa)}
                        />
                    );
                })}
            </GoogleMap>
        </>
    );
}