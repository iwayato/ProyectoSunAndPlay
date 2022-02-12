import { Circle, Popup, Tooltip, useMapEvents } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster";
import { useState } from "react";
import LineChartPlot from "../Graphs/LineChartPlot";
import getData from "./getData";

const color_selector = (acel) => {

    if ((0 <= acel) && (acel <= 6)) {
        return '#ffdd00'
    }
    if ((6.001 <= acel) && (acel <= 8)) {
        return '#ff9900'
    }
    if ((8.001 <= acel) && (acel <= 10)) {
        return '#ff4800'
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

    return(
        <MarkerClusterGroup disableClusteringAtZoom={13} maxClusterRadius={60} singleMarkerMode={false}>
            {props.infoTachas.map(tacha => (
                <Circle  
                    key={tacha.id}
                    center={[tacha.location.latitud, tacha.location.longitud]}
                    pathOptions={{color: color_selector(tacha.acelerometro), stroke : false, fillOpacity : 1, weight: 3}}
                    radius={zoom_converter(zoomLevel)}>

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
                        <LineChartPlot data={getData('aceleracion', tacha.id + 1)[1]} labels={getData('aceleracion', tacha.id + 1)[0]} varName='Vibraciones' borderColor='orange' backgroundColor='orange'></LineChartPlot>
                    </Tooltip>
                </Circle>
            ))}
        </MarkerClusterGroup>  
    )
}

export default VibMap;