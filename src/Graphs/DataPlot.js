import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const DataPlot = () => {

    const [temps , setTemps] = useState([]);
    const [acels , setAcels] = useState([]);
    const [hums , setHums] = useState([]);

    const refresh = () => {

        ['M_Temperatura', 'M_Aceleracion', 'M_Humedad'].forEach((param) => {
            axios.get(`https://proyecto-sun-and-play-server.herokuapp.com/data/${param}/1/true`).then((response) => {
                for (var tacha in response.data.data) {
                    for (var fecha in response.data.data[tacha]) {
                        if (response.data.data[tacha].hasOwnProperty(fecha))
                            if (fecha !== 'id') {
                                if (param === 'M_Temperatura') {
                                    // eslint-disable-next-line
                                    setTemps(temps => [...temps, response.data.data[tacha][fecha]]);
                                }
                                if (param === 'M_Aceleracion') {
                                    // eslint-disable-next-line
                                    setAcels(acels => [...acels, response.data.data[tacha][fecha]]);
                                }
                                if (param === 'M_Humedad') {
                                    // eslint-disable-next-line
                                    setHums(hums => [...hums, response.data.data[tacha][fecha]]);
                                }
                            }

                    }
                }
            })
        })
    }

    useEffect(refresh, []);

    console.log(temps);

    return(
        <div>
            <br></br>
            <Link to="/" style={{ textDecoration: 'none' }}>Página principal</Link>
            <br></br>
            <br></br>
            <button onClick={refresh}>
                Actualizar datos
            </button>
        </div>
    )

};

export default DataPlot;