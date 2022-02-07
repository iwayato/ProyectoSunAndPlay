import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from '@faker-js/faker';
import classes from './Plot.module.css'

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const LineChartPlot = (props) => {

  const options = {

    responsive: true,

    plugins: { title: { display: false, text: 'Temperatura' } },

    maintainAspectRatio: false

  };
  
  const labels = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
  const data = {
    labels,
    datasets: [

      {
        label: props.varName,
        data: labels.map(() => faker.datatype.number({ min: -10, max: 100 })),
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