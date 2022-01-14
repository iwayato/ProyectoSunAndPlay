import React from 'react';
import { MapContainer, TileLayer, LayersControl, ScaleControl, useMapEvent } from 'react-leaflet';
import useSwr from 'swr';
import Links from './Links';
import "leaflet.heat"
import HeatMap from './HeatMap';
import TachasMap from './TachasMap';
import HumMap from './HumMap';
import VibMap from './VibMap';
import info from './data.json';

// Funcion para hacer paning de forma suave
function SetViewOnClick() {
    const map = useMapEvent('click', (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: true,
      })
    })
  
    return null
}

const Map = () => {

    // Centro del Mapa
    const zoom = 13;
    const center = [-33.033916, -71.594816];
    const fetcher = (...args) => fetch(...args).then(response => response.json());
    const url = "https://data.police.uk/api/crimes-street/all-nodo?lat=52.629729&lng=-1.131592&date=2019-10";
    const { data, error } = useSwr(url, { fetcher });
    const nodos = data && !error ? data.slice(0, 5000) : [];

    return(

        <MapContainer center={center} zoom={zoom} minZoom={4} maxZoom={17} scrollWheelZoom={true} keyboardPanDelta={200} zoomControl={false}>
            <ScaleControl></ScaleControl>

            <Links></Links>

            <LayersControl position='topright' collapsed={false}>

                <LayersControl.BaseLayer name = 'Standart Map' checked = {true}>
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name='GrayScale Map' checked={false}>
                    <TileLayer attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, under <a href="https://www.openstreetmap.org/copyright">ODbL</a>' url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"/>
                </LayersControl.BaseLayer>

                <LayersControl.Overlay name='Tachas instaladas' checked={true} >
                    <TachasMap nodos={info} zoom={zoom}></TachasMap>
                </LayersControl.Overlay>

                <LayersControl.Overlay name='Mapa de temperatura' checked={false}>
                    <HeatMap nodos={info} zoom={zoom}></HeatMap>
                </LayersControl.Overlay>

                <LayersControl.Overlay name='Mapa de humedad' checked={false}>
                    <HumMap nodos={info} zoom={zoom}></HumMap>
                </LayersControl.Overlay>

                <LayersControl.Overlay name='Mapa de vibraciones' checked={false}>
                    <VibMap nodos={info} zoom={zoom}></VibMap>
                </LayersControl.Overlay>
    
            </LayersControl>

            <SetViewOnClick/>

        </MapContainer>

    );
};
export default Map;