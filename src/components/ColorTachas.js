import { useState } from "react";
import { Circle, Tooltip, useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

const zoom_converter = (zoomLevel) => {
  switch (zoomLevel) {
    case 17:
      return 12;
    case 16:
      return 24;
    case 15:
      return 36;
    case 14:
      return 65;
    case 13:
      return 120;
    case 12:
      return 300;
    case 11:
      return 600;
    case 10:
      return 1200;
    case 9:
      return 2100;
    case 8:
      return 4200;
    case 7:
      return 8000;
    case 6:
      return 17000;
    case 5:
      return 35000;
    case 4:
      return 60000;
    default:
      return 12;
  }
};

const ColorTacha = (props) => {
  const [zoomLevel, setZoomLevel] = useState(props.zoom); // initial zoom level provided for MapContainer

  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoomLevel(mapEvents.getZoom());
    },
  });

  return (
    <MarkerClusterGroup
      disableClusteringAtZoom={13}
      maxClusterRadius={60}
      singleMarkerMode={false}
    >
      {props.infoTachas.map((tacha) => (
        <Circle
          key={tacha.id}
          center={[tacha.location.latitud, tacha.location.longitud]}
          pathOptions={{
            color: tacha.color.color,
            stroke: false,
            fillOpacity: 1,
          }}
          radius={zoom_converter(zoomLevel)}
        >
          <Tooltip direction="bottom" opacity={1} sticky={true}>
            ID: {tacha.id} <br></br>
            Latitud: {tacha.location.latitud} <br></br>
            Longitud: {tacha.location.longitud} <br></br>
            Luz: {tacha.luz}
            <br></br>
            Temperatura: {tacha.temperatura}
            <br></br>
            Humedad: {tacha.humedad}
            <br></br>
            Acelerometro : {tacha.acelerometro} <br></br>
          </Tooltip>
        </Circle>
      ))}
    </MarkerClusterGroup>
  );
};

export default ColorTacha;
