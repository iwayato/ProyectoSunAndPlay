import React from 'react';
import { MapContainer, TileLayer, LayersControl, ScaleControl, useMapEvent } from 'react-leaflet';
import Links from './Links';
import "leaflet.heat"
import HeatMap from './HeatMap';
import TachasMap from './TachasMap';
import HumMap from './HumMap';
import VibMap from './VibMap';
import ColorTacha from './ColorTachas';
import SetLuzCard from './SetLuzCard';
import classes from './Map.module.css';


// Zoom y Centro del Mapa
const zoom = 14;
const center = [-33.033916, -71.594816];

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

    props.infoTachas.forEach(tacha => {
        tacha.location = props.locations[tacha.id]
        tacha.color = props.color[tacha.id]
    });

    return(

        <div>

            <SetLuzCard></SetLuzCard>
    
            <MapContainer center={center} zoom={zoom} minZoom={4} maxZoom={17} scrollWheelZoom={true} keyboardPanDelta={200} zoomControl={true}>

                <Links></Links>

                <LayersControl position='topright' collapsed={false} className="Map">

                    <LayersControl.BaseLayer name = 'Standart Map' checked = {true}>
                        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name='GrayScale Map' checked={false}>
                        <TileLayer attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, under <a href="https://www.openstreetmap.org/copyright">ODbL</a>' url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"/>
                    </LayersControl.BaseLayer>

                    <LayersControl.Overlay name='Mapa tachas instaladas' checked={true} >
                        <TachasMap infoTachas={props.infoTachas}></TachasMap>
                    </LayersControl.Overlay>
                    
                    <LayersControl.Overlay name='Mapa de temperatura' checked={false}>
                        <HeatMap infoTachas={props.infoTachas} zoom={zoom}></HeatMap>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name='Mapa de vibraciones' checked={false}>
                        <VibMap infoTachas={props.infoTachas} zoom={zoom}></VibMap>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name='Mapa de humedad' checked={false}>
                        <HumMap infoTachas={props.infoTachas} zoom={zoom}></HumMap>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name='Mapa color tachas' checked={false}>
                        <ColorTacha infoTachas={props.infoTachas} zoom={zoom}></ColorTacha>
                    </LayersControl.Overlay>
                    
                </LayersControl>

                <ScaleControl></ScaleControl>

                <SetViewOnClick></SetViewOnClick>

            </MapContainer>

        </div>

    );
};

export default Map;