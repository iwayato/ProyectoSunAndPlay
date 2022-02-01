import L from 'leaflet';

const ChillIcon = new L.Icon({
    iconUrl: require('../Assets/chill-face.png'),
    iconRetinaUrl: require("../Assets/chill-face.png"),
    iconSize: [60, 60],
    iconAnchor: [30, 30],
});

export { ChillIcon };