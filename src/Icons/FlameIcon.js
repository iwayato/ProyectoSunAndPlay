import L from 'leaflet';

const FlameIcon = new L.Icon({
    iconUrl: require('../Assets/face-with-heat.png'),
    iconRetinaUrl: require("../Assets/face-with-heat.png"),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

export { FlameIcon };