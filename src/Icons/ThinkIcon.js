import L from 'leaflet';

const ThinkIcon = new L.Icon({
    iconUrl: require('../Assets/think-face.png'),
    iconRetinaUrl: require("../Assets/think-face.png"),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

export { ThinkIcon };