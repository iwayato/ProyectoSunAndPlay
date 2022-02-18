import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const GlobalLineChartPlot = (props) => {

  let dataset = [];
  let labels = [];
  let title = '';

  if (props.tempSel) {
    dataset = [];
    title = 'Temperatura tachas instaladas';
    labels = [];
  }
  if (props.humSel) {
    dataset = [];
    title = 'Humedad tachas instaladas';
    labels = [];
  }
  if (props.acelSel) {
    dataset = [];
    title = 'Aceleración tachas instaladas';
    labels = [];
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
    labels : labels,
    datasets : dataset.slice(props.inicioTachas, props.finalTachas),
  };

  return(
    <Line options={options} data={data}></Line>
  ) 
}

export default GlobalLineChartPlot;