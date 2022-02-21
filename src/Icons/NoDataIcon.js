import L from 'leaflet';

const NoDataIcon = new L.Icon({
    iconUrl: require('../Assets/grayCircle.png'),
    iconRetinaUrl: require("../Assets/grayCircle.png"),
    iconSize: [20, 20],
    iconAnchor: [10, 10],
});

export { NoDataIcon };