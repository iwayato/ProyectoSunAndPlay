import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import classes from './LineChartGlobal.module.css'

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const LineChartPlotGlobal = (props) => {

    const options = {

        responsive: true,

        plugins: {
        title: {
            display: true,
            text: props.title
        },
        legend: { display: false }
        },

        maintainAspectRatio: false

    };

    const labels = props.labels[0];

    const data = {
        labels,
        datasets: [],
    };

    for (var tacha in props.data) {
        data.datasets.push({
            label: 'Valor',
            data: props.data[tacha],
            borderColor: props.borderColor,
            backgroundColor: props.backgroundColor,
        })
    }
  
    return(

        <div className={classes.LinePlot}>
            <Line options={options} data={data}/>
        </div>

    ) 
}

export default LineChartPlotGlobal;