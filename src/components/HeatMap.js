import { Marker, Circle, Popup, Tooltip, useMapEvents } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster";
import { useState } from "react";
import { FlameIcon } from "../Icons/FlameIcon";
import { ColdIcon } from "../Icons/ColdIcon";
import { ChillIcon } from "../Icons/ChillIcon";
import { ThinkIcon } from "../Icons/ThinkIcon";

const color_selector = (tmp) => {

    if ((0 <= tmp) && (tmp <= 60)) {
        return ColdIcon;
        //return '#59ff00'
    }
    if ((61 <= tmp) && (tmp <= 80)) {
        return ChillIcon;
        //return '#ffff00'
    }
    if ((81 <= tmp) && (tmp <= 100)) {
        return FlameIcon;
        //return '#ff3300'
    }
    else {
        return ThinkIcon;
        //return 'gray'
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

const HeatMap = (props) => {

    const [zoomLevel, setZoomLevel] = useState(props.zoom); // initial zoom level provided for MapContainer
    
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
    });

    return(
        <MarkerClusterGroup disableClusteringAtZoom={13} maxClusterRadius={60} singleMarkerMode={false}>
            {props.infoTachas.map(tacha => (
                <Marker
                    icon={color_selector(tacha.temperatura)}
                    key={tacha.id}
                    position={[tacha.location.latitud, tacha.location.longitud]}
                    //center={[tacha.location.latitud, tacha.location.longitud]}
                    //pathOptions={{color: color_selector(tacha.temperatura), stroke : false, fillOpacity : 1.0}}
                    //radius={zoom_converter(zoomLevel)}
                    >
                    <Popup closeOnClick={false}>
                        ID: {tacha.id} <br></br>
                        Latitud: {tacha.location.latitud} <br></br>
                        Longitud: {tacha.location.longitud} <br></br>
                        Luz: {tacha.luz}<br></br>
                        Temperatura: {tacha.temperatura}<br></br>
                        Humedad: {tacha.humedad}<br></br>
                        Acelerometro : {tacha.acelerometro} <br></br>
                    </Popup>
                    <Tooltip direction="bottom" opacity={1} sticky = {true}>
                        ID: {tacha.id} <br></br>
                        Latitud: {tacha.location.latitud} <br></br>
                        Longitud: {tacha.location.longitud} <br></br>
                        Luz: {tacha.luz}<br></br>
                        Temperatura: {tacha.temperatura}<br></br>
                        Humedad: {tacha.humedad}<br></br>
                        Acelerometro : {tacha.acelerometro} <br></br>
                    </Tooltip>
                </Marker>
            ))}
        </MarkerClusterGroup>                 
    )
}

export default HeatMap;