import React from 'react';
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
//import useSwr from 'swr';
import Links from './Links';
import "leaflet.heat"
import HeatMap from './HeatMap';
import TachasMap from './TachasMap';
import info from './data.json'

const Map = () => {

    const center = [-33.033916, -71.594816];
    //const fetcher = (...args) => fetch(...args).then(response => response.json());
    //const url = "https://data.police.uk/api/crimes-street/all-nodo?lat=52.629729&lng=-1.131592&date=2019-10";
    //const { data, error } = useSwr(url, { fetcher });
    //const nodos = data && !error ? data.slice(0, 5000) : [];
    
    return(

        <MapContainer center = {center} zoom = {14} maxZoom = {18} scrollWheelZoom = {true}>

            <Links/>

            <LayersControl position='topright'>

                <LayersControl.BaseLayer name = "Base Layer" checked>
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
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