import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import getData from "../components/getData";

//Boton de reinicio

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const numTachas = 21;
const labels = [];
labels.push(getData('temperatura', 1)[0]);

const temps = [];
const hums = [];
const acels = [];

['temperatura', 'humedad', 'aceleracion'].forEach((param) => {
    for (let m = 1; m <= numTachas; m++) {
        if (param === 'temperatura') {
            temps.push({ 
                data : getData(param, m)[1],
                label : `Tacha ${m}`,
                borderColor : '#' + Math.floor(Math.random()*16777215).toString(16),
                backgorundColor : '#' + Math.floor(Math.random()*16777215).toString(16)
            });
        }
        if (param === 'humedad') {
            hums.push({ 
                data : getData(param, m)[1],
                label : `Tacha ${m}`,
                borderColor : '#' + Math.floor(Math.random()*16777215).toString(16),
                backgorundColor : '#' + Math.floor(Math.random()*16777215).toString(16)
            });
        }
        if (param === 'aceleracion') {
            acels.push({ 
                data : getData(param, m)[1],
                label : `Tacha ${m}`,
                borderColor : '#' + Math.floor(Math.random()*16777215).toString(16),
                backgorundColor : '#' + Math.floor(Math.random()*16777215).toString(16)
            });
        }
    }
})

const GlobalLineChartPlot = (props) => {

  let dataset = [];
  let title = '';

  if (props.tempSel) {
    dataset = temps;
    title = 'Temperatura tachas instaladas';
  }
  if (props.humSel) {
    dataset = hums;
    title = 'Humedad tachas instaladas';
  }
  if (props.acelSel) {
    dataset = acels;
    title = 'Aceleración tachas instaladas';
  }
    
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display : false,
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
    maintainAspectRatio: false
  };
  
  const data = {
    labels : labels[0].slice(props.inicioFecha, props.finalFecha),
    datasets: dataset.slice(props.inicioTachas, props.finalTachas),
  };

  return(
      <Line options={options} data={data}/>
  ) 
}

export default GlobalLineChartPlot;