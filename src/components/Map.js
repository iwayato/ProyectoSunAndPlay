import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React from 'react';
import useSwr from 'swr';
import MarkerClusterGroup from 'react-leaflet-markercluster';

const fetcher = (...args) => fetch(...args).then(response => response.json());

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

};

const Map = (props) => {

    const url = "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10";
    const { data, error } = useSwr(url, { fetcher });
    const crimes = data && !error ? data.slice(0, 50000) : [];
    
    return(
        <div id="map">
            <head>
                <link 
                    rel="stylesheet" 
                    href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                    crossOrigin=""
                />

                <link
                rel="stylesheet"
                href="https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css"
                />
            </head>


            <MapContainer 
                center = {[52.6376, -1.135171]} 
                zoom = {15}
                maxZoom = {18} 
                scrollWheelZoom = {true}>

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MarkerClusterGroup
                    disableClusteringAtZoom={18}
                    maxClusterRadius={80}
                    singleMarkerMode={false}
                    eventHandlers = {{ clustermouseover : (e, id) => {showClusterInfo(e)},
                                       clustermouseout  : (e, id) => {console.log(id)}
                                    }}>

                    {crimes.map(crime => (
                        <Marker
                            key={crime.id}
                            position={[crime.location.latitude, crime.location.longitude]}
                            eventHandlers={{ mouseover : (e) => {e.target.openPopup(); },
                                             mouseout  : (e) => {e.target.closePopup();}
                                           }}>
                            <Popup>
                                ID: {crime.id} <br></br>
                                Latitud: {crime.location.latitude} <br></br>
                                Longitud: {crime.location.longitude} <br></br>
                                Luz: <br></br>
                                Temperatura: <br></br>
                                Humedad: <br></br>
                            </Popup>
                        </Marker>
                    ))};

                    
                </MarkerClusterGroup>

            </MapContainer>

        </div>
    )
};

export default Map;



