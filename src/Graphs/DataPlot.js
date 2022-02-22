import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import gettingData from "../components/gettingData";

const DataPlot = () => {

    const [temps , setTemps] = useState([]);
    const [acels , setAcels] = useState([]);
    const [hums , setHums] = useState([]);

    const refresh = () => {

        ['M_Temperatura', 'M_Humedad', 'M_Aceleracion'].forEach((param) => {

            axios.get(`https://proyecto-sun-and-play-server.herokuapp.com/data/${parametro}/1/true/1/1`).then((response) => {

                let data  = response.data.data[0];
        
                for (var key in data) {
                    if (data.hasOwnProperty(key)){
                        if (key !== 'id') {
                            dates.push(key);
                            values.push(data[key]);
                        }
                    }
                }
        
            });

        }

    }
        	

};

export default DataPlot;