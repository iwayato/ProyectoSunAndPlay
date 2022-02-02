import MarkerClusterGroup from "react-leaflet-markercluster";
import { Polyline, Tooltip } from "react-leaflet"

const color_selector = (hum) => {

    if ((0 <= hum) && (hum <= 49)) {
        return 'green'
    }
    if ((50 <= hum) && (hum <= 66)) {
        return 'yellow'
    }
    if ((67 <= hum) && (hum <= 100)) {
        return 'red'
    }
    else {
        return 'gray'
    }
}

const isOdd = (num) => {
    return num % 2;
}

function PolyLineMap(props) {

    let locations = [];
    let colores =[];
    let locationsOneLine = [];

    props.infoTachas.forEach(location => {
        locations.push([location.location.latitud, location.location.longitud]);
        colores.push(color_selector(location.humedad));
    });

    if (isOdd(locations.length)) {
        for (let i = 0; i < locations.length - 1; i++) {
            locationsOneLine.push([locations[i], locations[i + 1]]);
        }
    }
    else {
        for (let j = 0; j < locations.length; j++) {
            locationsOneLine.push([locations[j], locations[j + 1]]);
        }
    }

    return (
        <MarkerClusterGroup disableClusteringAtZoom={13} maxClusterRadius={60} singleMarkerMode={false}>
            {locationsOneLine.map( location => (
                <Polyline
                    key={locationsOneLine.indexOf(location)}
                    positions={location}
                    pathOptions={{color: colores[locationsOneLine.indexOf(location)], weight: 8}}>
                    <Tooltip direction="bottom" opacity={1} sticky = {true}>
                        ID: {props.infoTachas[locationsOneLine.indexOf(location)].id} <br></br>
                        Latitud: {props.infoTachas[locationsOneLine.indexOf(location)].location.latitud} <br></br>
                        Longitud: {props.infoTachas[locationsOneLine.indexOf(location)].location.longitud} <br></br>
                        Luz: {props.infoTachas[locationsOneLine.indexOf(location)].luz}<br></br>
                        Temperatura: {props.infoTachas[locationsOneLine.indexOf(location)].temperatura}<br></br>
                        Humedad: {props.infoTachas[locationsOneLine.indexOf(location)].humedad}<br></br>
                        Acelerometro : {props.infoTachas[locationsOneLine.indexOf(location)].acelerometro} <br></br>
                    </Tooltip>
                </Polyline>
            ))};
        </MarkerClusterGroup>
    );
};

export default PolyLineMap;