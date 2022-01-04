import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import React from 'react';

const Map = (props) => {

    return(
        <div>

            <head>
                <link 
                    rel="stylesheet" 
                    href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                    crossOrigin=""
                />
            </head>

            <MapContainer center={[-33.033915, -71.59516]} zoom={16} scrollWheelZoom={true}>

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

            <Marker 
                position = {[-33.033915, -71.59516]}
                eventHandlers = {{ mouseover : (e) => {e.target.openPopup();},
                                   mouseout  : (e) => {e.target.closePopup();},
                                   click     : (e) => {e.target.openPopup();}}}>

                <Popup>
                    ID: <br></br>
                    Posición: <br></br>
                    Luz: <br></br>
                    Temperatura: <br></br>
                    Humedad: <br></br>
                </Popup>

            </Marker>

            </MapContainer>

        </div>
    )
};

export default Map;



