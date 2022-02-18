import { Marker, Popup, Tooltip } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster";
import { vib_bajo } from "../Icons/vib_bajo";
import { vib_medio } from "../Icons/vib_medio";
import { vib_alto } from "../Icons/vib_alto";
import GetData from './GetData';

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
                        <GetData
                            parametro={'M_Aceleracion'}
                            id={tacha.id + 1}
                            varName={'aceleraciones'}
                            borderColor={'orange'}
                            backgroundColor={'orange'}>
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

export default VibMap;