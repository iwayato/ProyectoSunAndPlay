import { Circle, Popup, Tooltip, useMapEvents } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster";
import { useState } from "react";

const color_selector = (tmp) => {

    if ((0 <= tmp) && (tmp <= 60)) {
        return 'green'
    }
    if ((61 <= tmp) && (tmp <= 80)) {
        return 'yellow'
    }
    if ((81 <= tmp) && (tmp <= 100)) {
        return 'red'
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
            return 20
        case 15:
            return 40
        case 14:
            return 60
        case 13:
            return 120
        case 12:
            return 250
        case 11:
            return 400
        default:
            return 600
    }
}

const HeatMap = (props) => {

    const [zoomLevel, setZoomLevel] = useState(14); // initial zoom level provided for MapContainer
    
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
    });

    return(
        <MarkerClusterGroup disableClusteringAtZoom={5} maxClusterRadius={60}>
            {props.nodos.map(nodo => (
                <Circle
                    key={nodo.id}
                    center={[nodo.location.latitude, nodo.location.longitude]}
                    pathOptions={{color: color_selector(nodo.temperatura), stroke : false, fillOpacity : 0.8}}
                    radius={zoom_converter(zoomLevel)}>
                    <Popup>
                        ID: {nodo.id} <br></br>
                        Latitud: {nodo.location.latitude} <br></br>
                        Longitud: {nodo.location.longitude} <br></br>
                        Luz: {nodo.luz}<br></br>
                        Temperatura: {nodo.temperatura}<br></br>
                        Humedad: {nodo.humedad}<br></br>
                    </Popup>
                    <Tooltip direction="bottom" opacity={1} sticky = {true}>
                        ID: {nodo.id} <br></br>
                        Latitud: {nodo.location.latitude} <br></br>
                        Longitud: {nodo.location.longitude} <br></br>
                        Luz: {nodo.luz}<br></br>
                        Temperatura: {nodo.temperatura}<br></br>
                        Humedad: {nodo.humedad}<br></br>
                    </Tooltip>
                </Circle>
            ))}
        </MarkerClusterGroup>                 
    )
}

export default HeatMap;