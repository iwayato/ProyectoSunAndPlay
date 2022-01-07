import { Marker, Popup } from "react-leaflet";

const showClusterInfo = (e) => {
    const totalNodos = e.layer.getAllChildMarkers().length;

    let sumLats = 0;
    let sumLong = 0;

    for (let index = 0; index < totalNodos; index++) {
        sumLats = sumLats + e.layer.getAllChildMarkers()[index]._latlng.lat;
        sumLong = sumLong + e.layer.getAllChildMarkers()[index]._latlng.lng;
    }

    const promLat = sumLats/totalNodos;
    const promLong = sumLong/totalNodos;

    console.log(totalNodos, promLat, promLong);

    return(
        <Marker>
            <Popup>
                INFO
            </Popup>
        </Marker>
    )
};

export default showClusterInfo;