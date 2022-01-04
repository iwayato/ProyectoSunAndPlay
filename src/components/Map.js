import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Map = () => {

    return(
        <div>

            <head>
                <link 
                    rel="stylesheet" 
                    href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                    crossOrigin=""
                />
            </head>

            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position = {[-33.033915, -71.59516]}>   
                    <Popup>
                        ID : <br></br>
                        Posición : <br></br>     
                        Luz : <br></br>
                        Temperatura : <br></br>
                        Humedad : <br></br>                            
                    </Popup>            
                </Marker>                               
                
            </MapContainer>

        </div>
    )
};

export default Map;



