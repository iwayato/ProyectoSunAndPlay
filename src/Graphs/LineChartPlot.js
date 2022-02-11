import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import classes from './Plot.module.css'

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const LineChartPlot = (props) => {

  const options = {

    responsive: true,

    plugins: { title: { display: false, text: 'Temperatura' } },

    maintainAspectRatio: false

  };
  
  const labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
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