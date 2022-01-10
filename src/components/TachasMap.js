import MarkerClusterGroup from "react-leaflet-markercluster";
import { Marker, Popup } from "react-leaflet";

const TachasMap = (props) => {
    return(
        <MarkerClusterGroup disableClusteringAtZoom={18} maxClusterRadius={80} singleMarkerMode={false}>
            {props.nodos.map(nodo => (
                <Marker
                    key={nodo.id}
                    position={[nodo.location.latitude, nodo.location.longitude]}
                    eventHandlers={{mouseover : (e) => {e.target.openPopup(); },
                                    mouseout  : (e) => {e.target.closePopup();}
                                    }}>
                    <Popup>
                        ID: {nodo.id} <br></br>
                        Latitud: {nodo.location.latitude} <br></br>
                        Longitud: {nodo.location.longitude} <br></br>
                        Luz: {nodo.luz}<br></br>
                        Temperatura: {nodo.temperatura}<br></br>
                        Humedad: {nodo.humedad}<br></br>
                    </Popup>
                </Marker>
            ))};
        </MarkerClusterGroup>
    )
}

export default TachasMap;


