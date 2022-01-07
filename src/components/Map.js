import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import React, { useEffect } from 'react';
import useSwr from 'swr';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Links from './Links';
import { useMap } from 'react-leaflet';
import L from "leaflet";
import { addressPoints } from "./addressPoints";


const fetcher = (...args) => fetch(...args).then(response => response.json());

const Map = (props) => {

    const url = "https://data.police.uk/api/crimes-street/all-nodo?lat=52.629729&lng=-1.131592&date=2019-10";
    const { data, error } = useSwr(url, { fetcher });
    const nodos = data && !error ? data.slice(0, 5000) : [];

    function MyComponent() {
        const map = useMap()
        console.log('map center:', map.getCenter())
        return map
      }

    return(

        <MapContainer center = {[52.628996, -1.128925]} zoom = {14} maxZoom = {18} scrollWheelZoom = {true}>

        <Links></Links>

        <LayersControl position='topright'>

        <LayersControl.BaseLayer checked name = "Nodos">
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        </LayersControl.BaseLayer>

        <LayersControl.Overlay checked name='Tachas instaladas'>
            <MarkerClusterGroup disableClusteringAtZoom={18} maxClusterRadius={80} singleMarkerMode={false}>
                {nodos.map(nodo => (
                    <Marker
                        key={nodo.id}
                        position={[nodo.location.latitude, nodo.location.longitude]}
                        eventHandlers={{mouseover : (e) => {e.target.openPopup(); },
                                        mouseout  : (e) => {e.target.closePopup();}
                                        }}>
                        <Popup>
                            ID: {nodo.id} <br></br>
                            Latitud: {nodo.location.latitude} <br></br>
                            Longitud: {nodo.location.longitude} <br></br>
                            Luz: <br></br>
                            Temperatura: <br></br>
                            Humedad: <br></br>
                        </Popup>
                    </Marker>
                ))};
            </MarkerClusterGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name='Mapa de temperatura'>
                {
                    useEffect(() => {
            
                    const points = addressPoints
                        ? addressPoints.map((p) => {
                            return [p[0], p[1]];
                        })
                        : [];
                
                    L.heatLayer(points).addTo(MyComponent());

                    }, [])
                };
        </LayersControl.Overlay> 

        </LayersControl>
        </MapContainer>
    )
};

export default Map;



