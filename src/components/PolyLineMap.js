import { Polyline } from "react-leaflet"

const color_selector = (hum) => {

    if ((0 <= hum) && (hum <= 60)) {
        return '#00ffe1'
    }
    if ((60.001 <= hum) && (hum <= 80)) {
        return '#00aeff'
    }
    if ((80.001 <= hum) && (hum <= 100)) {
        return '#001aff'
    }
    else {
        return 'gray'
    }
}

function PolyLineMap(props) {

    let locations = [];
    let colores =[];

    props.infoTachas.forEach(tacha => {
        locations.push([tacha.location.latitud, tacha.location.longitud]);
        colores.push(color_selector(tacha.humedad));
    });

    let initialLocations = [locations[0], locations[1]];

    return (
        {
            
        }
    );
};

export default PolyLineMap;