import { Marker, Popup, Tooltip } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster";
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

const VibMap = (props) => {

    return(
        <MarkerClusterGroup disableClusteringAtZoom={13} maxClusterRadius={60} singleMarkerMode={false}>
            {props.infoTachas.map(tacha => (
                <Marker  
                    key={tacha.id}
                    position={[tacha.location.latitud, tacha.location.longitud]}>
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
                </Marker>
            ))}
        </MarkerClusterGroup>  
    )
}

export default VibMap;