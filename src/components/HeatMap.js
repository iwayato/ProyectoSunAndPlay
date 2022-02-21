import { Popup, Polyline, Tooltip } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster";
import GetData from './GetData';

const color_selector = (tmp) => {

    if ((0 <= tmp) && (tmp <= 60)) {
        return '#59ff00'
    }
    if ((61 <= tmp) && (tmp <= 80)) {
        return '#ffff00'
    }
    if ((81 <= tmp) && (tmp <= 100)) {
        return '#ff3300'
    }
    else {
        return 'gray'
    }
}

const isOdd = (num) => {
    return num % 2;
}

const HeatMap = (props) => {

    let locations = [];
    let colores =[];
    let locationsOneLine = [];

    props.infoTachas.forEach(location => {
        locations.push([location.location.latitud, location.location.longitud]);
        colores.push(color_selector(location.temperatura));
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
                    pathOptions={{color: colores[locationsOneLine.indexOf(location)], weight: 12, lineCap: 'round'}}>
                    <Popup closeOnClick={false}>
                        <GetData
                            parametro={'M_Temperatura'}
                            id={props.infoTachas[locationsOneLine.indexOf(location)].id + 1}
                            varName={'Temperaturas'}
                            borderColor={'red'}
                            backgroundColor={'red'}>
                        </GetData>
                    </Popup>
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
}

export default HeatMap;