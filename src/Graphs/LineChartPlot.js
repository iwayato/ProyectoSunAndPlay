import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import classes from './Plot.module.css'

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const LineChartPlot = (props) => {

  const options = {

    responsive: true,

    plugins: {
      title: {
        display: true,
        text: 'Últimas 10 ' + props.varName + ' de la tacha ' + (props.id - 1)},
      legend: { display: false }
    },

    maintainAspectRatio: false

  };
  
  const labels = props.labels;
  
  const data = {
    labels,
    datasets: [

      {
        label: props.varName,
        data: props.data,
        borderColor: props.borderColor,
        backgroundColor: props.backgroundColor,
      },

    ],
  };

  return(

    <div className={classes.LinePlot}>
      <Line options={options} data={data}/>
    </div>

  ) 
}

export default LineChartPlot;