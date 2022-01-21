import React from 'react';
import { MapContainer, TileLayer, LayersControl, ScaleControl, useMapEvent } from 'react-leaflet';
import Links from './Links';
import "leaflet.heat"
import HeatMap from './HeatMap';
import TachasMap from './TachasMap';
import HumMap from './HumMap';
import VibMap from './VibMap';

const url = 'http://3.90.212.240:8080/api/devices/2cf7f1203230a466/queue';
const body = JSON.stringify({"deviceQueueItem": {"confirmed": true, "data": "Ag==", "devEUI": "2cf7f1203230a466", "fCnt": 0, "fPort": 3}});
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiNDExMzkxZDItMGY0ZC00MTAzLTkwZjAtNDE1NTQ0ZjA4YTljIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTY0MjYxNjIwMCwic3ViIjoiYXBpX2tleSJ9._a7OBvSyrw0z-Gdo36W2SgjoVfe5syE2ZgKsl-13qes";

// Funcion para hacer paning de forma suave
function SetViewOnClick() {
    const map = useMapEvent('click', (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: true,
      })
    })
  
    return null
}

const Map = (props) => {

    // Zoom y Centro del Mapa
    const zoom = 14;
    const center = [-33.033916, -71.594816];

    console.log("Lo que llega a Map.js", props.infoTachas);

    return(

        <div>

            <button onClick = 
                {
                    fetch(url, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Access-Control-Allow-Origin': 'http://3.90.212.240:8080/api/devices/2cf7f1203230a466/queue',
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Grpc-Metadata-Authorization': 'Bearer ' + token,
                        'Content-Length': body.length 
                    },
                    body: body,
                    }).then(() => console.log('Se envió información por http'))                               
                }>
            Enviar POST request</button>

            <MapContainer center={center} zoom={zoom} minZoom={4} maxZoom={17} scrollWheelZoom={true} keyboardPanDelta={200} zoomControl={true}>
            
                <Links></Links>

                <LayersControl position='topright' collapsed={true}>

                    <LayersControl.BaseLayer name = 'Standart Map' checked = {true}>
                        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name='GrayScale Map' checked={false}>
                        <TileLayer attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, under <a href="https://www.openstreetmap.org/copyright">ODbL</a>' url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"/>
                    </LayersControl.BaseLayer>

                    <LayersControl.Overlay name='Mapa Tachas instaladas' checked={true} >
                        <TachasMap nodos={props.infoTachas}></TachasMap>
                    </LayersControl.Overlay>
                    
                    <LayersControl.Overlay name='Mapa de vibraciones' checked={false}>
                        <VibMap nodos={props.infoTachas} zoom={zoom}></VibMap>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name='Mapa de temperatura' checked={false}>
                        <HeatMap nodos={props.infoTachas} zoom={zoom}></HeatMap>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name='Mapa de humedad' checked={false}>
                        <HumMap nodos={props.infoTachas} zoom={zoom}></HumMap>
                    </LayersControl.Overlay>
                    
                </LayersControl>

                <ScaleControl></ScaleControl>

                <SetViewOnClick/>

            </MapContainer>

        </div>

    );
};

export default Map;