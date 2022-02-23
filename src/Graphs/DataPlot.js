import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const DataPlot = () => {

    const [temps , setTemps] = useState([]);
    const [acels , setAcels] = useState([]);
    const [hums , setHums] = useState([]);

    const refresh = () => {

        ['M_Temperatura', 'M_Humedad', 'M_Aceleracion'].forEach((param) => {

            axios.get(`https://proyecto-sun-and-play-server.herokuapp.com/data/${param}/1/true`).then((response) => {

                console.log(param, response.data.data);
        
            })

        })

    }

    useEffect(refresh);
        	
    console.log(refresh());

    return(
        <div>
            <Link to="/" style={{ textDecoration: 'none' }}>Página principal</Link>
            <br></br>
            <br></br>
            aksdjhaksjhd
        </div>
    )

};

export default DataPlot;