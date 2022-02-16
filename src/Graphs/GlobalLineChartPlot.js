import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import getData from "../components/getData";

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const numTachas = 21;
let labels = [];
let temps = [];
let hums = [];
let acels = [];

const randomColor = () => {
  return Math.floor(Math.random()*16777215).toString(16);
}

labels.push(getData('M_Temperatura', 1)[0]);


['M_Temperatura', 'M_Humedad', 'M_Aceleracion'].forEach((param) => {
    for (let m = 1; m <= numTachas; m++) {
        if (param === 'M_Temperatura') {
            temps.push({ 
                data : getData(param, m)[1],
                label : `Tacha ${m}`,
                borderColor : '#' + randomColor(),
                backgorundColor : '#' + randomColor()
            });
        }
        if (param === 'M_Humedad') {
            hums.push({ 
                data : getData(param, m)[1],
                label : `Tacha ${m}`,
                borderColor : '#' + randomColor(),
                backgorundColor : '#' + randomColor()
            });
        }
        if (param === 'M_Aceleracion') {
            acels.push({ 
                data : getData(param, m)[1],
                label : `Tacha ${m}`,
                borderColor : '#' + randomColor(),
                backgorundColor : '#' + randomColor()
            });
        }
    }
  }
)

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
    datasets : dataset.slice(props.inicioTachas, props.finalTachas),
  };

  return(
    <Line options={options} data={data}></Line>
  ) 
}

export default GlobalLineChartPlot;