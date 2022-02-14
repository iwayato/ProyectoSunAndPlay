import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const GlobalLineChartPlot = (props) => {

  console.log(props);

  const labels = props.labels[0];
  const datasets = [];

  for (let k = 0; k < labels.length; k++) {
    datasets.push(
      {
        label: `Tacha${k}`,
        data: props.temps[k],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    )
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display : false,
        position: 'top',
      },
      title: {
        display: false,
        text: 'Line Plot',
      },
    },
    maintainAspectRatio: false
  };
  
  const data = {
    labels,
    datasets: datasets,
  };

  return(
      <Line options={options} data={data}/>
  ) 
}

export default GlobalLineChartPlot;