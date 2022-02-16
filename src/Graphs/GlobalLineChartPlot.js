import React, { useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import getData from "../components/getData";

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const numTachas = 21;
const labels = [];
const temps = [];
const hums = [];
const acels = [];

const randomColor = () => {
  return Math.floor(Math.random()*16777215).toString(16);
}

function obtenerDatos() {
  console.log('Llamado a obtener datos');

  labels.push(getData('temperatura', 1)[0]);

  ['temperatura', 'humedad', 'aceleracion'].forEach((param) => {
      for (let m = 1; m <= numTachas; m++) {
          if (param === 'temperatura') {
              temps.push({ 
                  data : getData(param, m)[1],
                  label : `Tacha ${m}`,
                  borderColor : '#' + randomColor(),
                  backgorundColor : '#' + randomColor()
              });
          }
          if (param === 'humedad') {
              hums.push({ 
                  data : getData(param, m)[1],
                  label : `Tacha ${m}`,
                  borderColor : '#' + randomColor(),
                  backgorundColor : '#' + randomColor()
              });
          }
          if (param === 'aceleracion') {
              acels.push({ 
                  data : getData(param, m)[1],
                  label : `Tacha ${m}`,
                  borderColor : '#' + randomColor(),
                  backgorundColor : '#' + randomColor()
              });
          }
      }
  })
}

const GlobalLineChartPlot = (props) => {

  let dataset = [];
  let title = '';

  useEffect(() => {
    setInterval(() => { obtenerDatos() }, 5000);
  }, []);

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
    labels : labels[0],
    datasets : dataset,
  };

  console.log(data);

  return(
      <Line options={options} data={data}/>
  ) 
}

export default GlobalLineChartPlot;