import { Circle, Popup, Tooltip, useMapEvents } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster";
import { useState } from "react";

const color_selector = (hum) => {

    if ((0 <= hum) && (hum <= 53)) {
        return '#00ffe1'
    }
    if ((54 <= hum) && (hum <= 57)) {
        return '#00aeff'
    }
    if ((58 <= hum) && (hum <= 60)) {
        return '#001aff'
    }
    else {
        return 'gray'
    }
}

const zoom_converter = (zoomLevel) => {

    switch (zoomLevel) {
        case 17:
            return 12
        case 16:
            return 24
        case 15:
            return 36
        case 14:
            return 65
        case 13:
            return 120
        case 12:
            return 300
        case 11:
            return 600
        case 10:
            return 1200
        case 9:
            return 2100
        case 8:
            return 4200
        case 7:
            return 8000
        case 6:
            return 17000
        case 5:
            return 35000
        case 4:
            return 60000
        default:
            return 12
    }
}

const HumMap = (props) => {

    const [zoomLevel, setZoomLevel] = useState(props.zoom); // initial zoom level provided for MapContainer
    
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
    });
    
    return(
        <MarkerClusterGroup disableClusteringAtZoom={13} maxClusterRadius={60} singleMarkerMode={false}>
            {props.nodos.map(nodo => (
                <Circle  
                    key={nodo.id}
                    center={[nodo.location.latitude, nodo.location.longitude]}
                    pathOptions={{color: color_selector(nodo.humedad), stroke : false, fillOpacity : 1.0}}
                    radius={zoom_converter(zoomLevel)}>
                    <Popup>
                        ID: {nodo.id} <br></br>
                        Latitud: {nodo.location.latitude} <br></br>
                        Longitud: {nodo.location.longitude} <br></br>
                        Luz: {nodo.luz}<br></br>
                        Temperatura: {nodo.temperatura}<br></br>
                        Humedad: {nodo.humedad}<br></br>
                        Acelerometro : {nodo.acelerometro} <br></br>
                    </Popup>
                    <Tooltip direction="bottom" opacity={1} sticky = {true}>
                        ID: {nodo.id} <br></br>
                        Latitud: {nodo.location.latitude} <br></br>
                        Longitud: {nodo.location.longitude} <br></br>
                        Luz: {nodo.luz}<br></br>
                        Temperatura: {nodo.temperatura}<br></br>
                        Humedad: {nodo.humedad}<br></br>
                        Acelerometro : {nodo.acelerometro} <br></br>
                    </Tooltip>
                </Circle>
            ))}
        </MarkerClusterGroup>                 
    )
}

export default HumMap;