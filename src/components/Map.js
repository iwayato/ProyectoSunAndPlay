import React from 'react';
import { MapContainer, TileLayer, LayersControl, ScaleControl } from 'react-leaflet';
import useSwr from 'swr';
import Links from './Links';
import "leaflet.heat"
import HeatMap from './HeatMap';
import TachasMap from './TachasMap';
import info from './data.json'

const Map = () => {

    // Centro del Mapa
    const center = [-33.033916, -71.594816];
    const fetcher = (...args) => fetch(...args).then(response => response.json());
    const url = "https://data.police.uk/api/crimes-street/all-nodo?lat=52.629729&lng=-1.131592&date=2019-10";
    const { data, error } = useSwr(url, { fetcher });
    const nodos = data && !error ? data.slice(0, 5000) : [];

    return(

        <MapContainer center={center} zoom={14} minZoom={11} maxZoom={17} scrollWheelZoom={true} keyboardPanDelta={200} zoomControl={false}>
            <ScaleControl></ScaleControl>

            <Links></Links>

            <LayersControl position='topleft' collapsed={false}>

                <LayersControl.BaseLayer name = 'Standart Map' checked>
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name='GrayScale Map'>
                    <TileLayer attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, under <a href="https://www.openstreetmap.org/copyright">ODbL</a>' url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"/>
                </LayersControl.BaseLayer>

                <LayersControl.Overlay name='Tachas instaladas' checked>
                    <TachasMap nodos={info}></TachasMap>
                </LayersControl.Overlay>

                <LayersControl.Overlay name='Mapa de temperatura'>
                    <HeatMap nodos={info}></HeatMap>
                </LayersControl.Overlay>
    
            </LayersControl>
        </MapContainer>

    );
};
export default Map;