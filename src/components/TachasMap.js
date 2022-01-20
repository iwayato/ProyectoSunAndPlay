import MarkerClusterGroup from "react-leaflet-markercluster";
import { Marker, Popup, Tooltip } from "react-leaflet";

const TachasMap = (props) => {

    console.log("Lo que llega a TachasMap.js", props.nodos);

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
                    Temperatura: {nodo.Temperatura}<br></br>
                    Humedad: {nodo.Humedad}<br></br>
                    Acelerometro : {nodo.Aceleracion} <br></br>
                </Popup>
                <Tooltip direction="bottom" opacity={1} sticky = {true}>
                    ID: {nodo.id} <br></br>
                    Latitud: {nodo.location.latitude} <br></br>
                    Longitud: {nodo.location.longitude} <br></br>
                    Luz: {nodo.luz}<br></br>
                    Temperatura: {nodo.Temperatura}<br></br>
                    Humedad: {nodo.Humedad}<br></br>
                    Acelerometro : {nodo.Aceleracion} <br></br>
                </Tooltip>
            </Marker>
        ))};
        </MarkerClusterGroup>
    )
}

export default TachasMap;