import { Marker, Popup, Tooltip } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster";
import { hum_bajo } from "../Icons/hum_bajo";
import { hum_medio } from "../Icons/hum_medio";
import { hum_alto } from "../Icons/hum_alto";
import GetData from './GetData';

const color_selector = (hum) => {

    if ((0 <= hum) && (hum <= 60)) {
        return hum_bajo;
    }
    if ((60.001 <= hum) && (hum <= 80)) {
        return hum_medio;
    }
    if ((80.001 <= hum) && (hum <= 100)) {
        return hum_alto;
    }
    else {
        return;
    }
}

const HumMap = (props) => {

    return(
        <MarkerClusterGroup disableClusteringAtZoom={13} maxClusterRadius={60} singleMarkerMode={false}>
            {props.infoTachas.map(tacha => (
                <Marker
                    icon={color_selector(tacha.humedad)}  
                    key={tacha.id}
                    position={[tacha.location.latitud, tacha.location.longitud]}>
                    <Popup closeOnClick={false}>
                        <GetData
                            parametro={'M_Humedad'}
                            id={tacha.id + 1}
                            varName={'humedades'}
                            borderColor={'lightblue'}
                            backgroundColor={'lightblue'}>
                        </GetData>
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

export default HumMap;