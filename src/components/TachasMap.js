import MarkerClusterGroup from "react-leaflet-markercluster";
import { Marker, Popup, Tooltip } from "react-leaflet";

const TachasMap = (props) => {
    return(
        <MarkerClusterGroup disableClusteringAtZoom={13} maxClusterRadius={60} singleMarkerMode={false}>
            {props.nodos.map(nodo => (
            <Marker
                key={nodo.id}
                position={[nodo.location.latitude, nodo.location.longitude]}>
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
            </Marker>
        ))};
        </MarkerClusterGroup>
    )
}

export default TachasMap;