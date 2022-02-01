import L from 'leaflet';

const ColdIcon = new L.Icon({
    iconUrl: require('../Assets/cold-face.png'),
    iconRetinaUrl: require("../Assets/cold-face.png"),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

export { ColdIcon };