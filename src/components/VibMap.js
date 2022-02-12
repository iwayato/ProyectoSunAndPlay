import { Marker, Popup, Tooltip } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster";
import LineChartPlot from "../Graphs/LineChartPlot";
import getData from "./getData";
import { vib_bajo } from "../Icons/vib_bajo";
import { vib_medio } from "../Icons/vib_medio";
import { vib_alto } from "../Icons/vib_alto";

const color_selector = (acel) => {

    if ((0 <= acel) && (acel <= 6)) {
        return vib_bajo;
    }
    if ((6.001 <= acel) && (acel <= 8)) {
        return vib_medio;
    }
    if ((8.001 <= acel) && (acel <= 10)) {
        return vib_alto;
    }
    else {
        return;
    }
}

const VibMap = (props) => {

    return(
        <MarkerClusterGroup disableClusteringAtZoom={13} maxClusterRadius={60} singleMarkerMode={false}>
            {props.infoTachas.map(tacha => (
                <Marker
                    icon={color_selector(tacha.acelerometro)}  
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