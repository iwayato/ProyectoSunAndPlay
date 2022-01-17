import { Circle, Popup, Tooltip, useMapEvents } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster";
import { useState, useRef, useEffect } from "react";

const color_selector = (tmp) => {

    if ((0 <= tmp) && (tmp <= 60)) {
        return '#ff3300'
    }
    if ((61 <= tmp) && (tmp <= 80)) {
        return '#ffff00'
    }
    if ((81 <= tmp) && (tmp <= 100)) {
        return '#59ff00'
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

const VibMap = (props) => {

    const [zoomLevel, setZoomLevel] = useState(props.zoom); // initial zoom level provided for MapContainer
    
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
    });

    const SetBlink = (acel) => {

        const [render, setRender] = useState(true)
        const timerRef = useRef()
        
        const interval = (a) => {
            if ((0 <= a) && (a <= 60)) {
                return 1000
            }
            if ((61 <= a) && (a <= 80)) {
                return 500
            }
            if ((81 <= a) && (a <= 100)) {
                return 250
            }
            else {
                return 1000
            }
        }

        useEffect(() => {
            timerRef.current = setInterval(() => {setRender((r) => !r)}, interval(acel));
            return () => {clearInterval(timerRef.current)}
        },[acel])

        return render;
    }

    return(
        <MarkerClusterGroup disableClusteringAtZoom={13} maxClusterRadius={60} singleMarkerMode={false}>
            {props.nodos.map(nodo => ( SetBlink(nodo.acelerometro) ? (
                <Circle  
                key={nodo.id}
                center={[nodo.location.latitude, nodo.location.longitude]}
                pathOptions={{color: color_selector(nodo.acelerometro), stroke : false, fillOpacity : 0.9}}
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
            </Circle>) : null ))}
        </MarkerClusterGroup>  
    )
}

export default VibMap;