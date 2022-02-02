import L from 'leaflet';

const FlameIcon = new L.Icon({
    iconUrl: require('../Assets/cirRojo.png'),
    iconRetinaUrl: require("../Assets/cirRojo.png"),
    iconSize: [19, 19],
    iconAnchor: [9.5, 9.5],
});

export { FlameIcon };