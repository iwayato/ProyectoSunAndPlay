import { Circle, Popup } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster";

const color_selector = (tmp) => {

    if ((30 <= tmp) && (tmp <= 40)) {
        return 'green'
    }
    if ((41 <= tmp) && (tmp <= 50)) {
        return 'yellow'
    }
    if ((51 <= tmp) && (tmp <= 60)) {
        return 'orange'
    }
    if ((61 <= tmp) && (tmp <= 70)) {
        return 'red'
    }
    if ((71 <= tmp) && (tmp <= 80)) {
        return 'purple'
    }
    else {
        return 'black'
    }

}

const HeatMap = (props) => {
    return(
        <MarkerClusterGroup disableClusteringAtZoom={14} maxClusterRadius={60} singleMarkerMode={false}>
            {props.nodos.map(nodo => (
                <Circle
                    key={nodo.id}
                    center={[nodo.location.latitude, nodo.location.longitude]}
                    pathOptions={{color: color_selector(nodo.temperatura)}}
                    radius={5}
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
                </Circle>
            ))}
        </MarkerClusterGroup>                 
    )
}

export default HeatMap;