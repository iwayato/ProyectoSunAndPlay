import MarkerClusterGroup from "react-leaflet-markercluster";
import { Marker, Popup, Tooltip } from "react-leaflet";

const TachasMap = (props) => {

    console.log("Lo que llega a TachasMap.js", props.nodos);

    return(
        <MarkerClusterGroup disableClusteringAtZoom={13} maxClusterRadius={60} singleMarkerMode={false}>
            {props.nodos.map(nodo => (
            <Marker
                key={nodo.id}
                position={[nodo.latitud, nodo.longitud]}>
                <Popup>
                    ID: {nodo.id} <br></br>
                    Latitud: {nodo.latitud} <br></br>
                    Longitud: {nodo.longitud} <br></br>
                    Luz: {nodo.luz}<br></br>
                    Temperatura: {nodo.temperatura}<br></br>
                    Humedad: {nodo.humedad}<br></br>
                    Acelerometro : {nodo.acelerometro} <br></br>
                </Popup>
                <Tooltip direction="bottom" opacity={1} sticky = {true}>
                    ID: {nodo.id} <br></br>
                    Latitud: {nodo.latitud} <br></br>
                    Longitud: {nodo.longitud} <br></br>
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