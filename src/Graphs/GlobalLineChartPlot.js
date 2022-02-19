import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './LineChartGlobal.module.css';
import { Line } from 'react-chartjs-2';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const randomColor = () => {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}

const GlobalLineChartPlot = (props) => {

  const [isLoading, setLoading] = useState(true);
  let title = '';
  let parametro = '';

  if (props.tempSel) {
    title = 'Temperatura tachas instaladas';
    parametro = 'M_Temperatura';
  }
  if (props.humSel) {
    title = 'Humedad tachas instaladas';
    parametro = 'M_Humedad';
  }
  if (props.acelSel) {
    title = 'Aceleración tachas instaladas';
    parametro = 'M_Aceleracion';
  }

  const refresh = () => {

    let datasets = [];
    let labels = [];

    axios.get(`http://localhost:3001/data/${parametro}/1/true/${props.inicioTachas}/${props.finalTachas}`).then((response) => {

      for (var tacha in response.data.data) {
        let dataset = [];
        let labelsTacha = [];
        for(var key in response.data.data[tacha]) {
          if (response.data.data[tacha].hasOwnProperty(key)){
            if (key !== 'id') {
              labelsTacha.push(key)
              dataset.push(response.data.data[tacha][key])
            }
          }
        }
        labels.push(labelsTacha.slice(props.inicioFecha, props.finalFecha));
        datasets.push(dataset.slice(props.inicioFecha, props.finalFecha));
      }

      setLoading(false);

    })

    return [labels, datasets]

  };

  useEffect(refresh, [props.id, parametro, props.inicioTachas, props.finalTachas, props.inicioFecha, props.finalFecha]);

  const options = {

    responsive: true,

    plugins: {
    title: {
        display: true,
        text: title
    },
    legend: { display: false }
    },

    maintainAspectRatio: false

  };

  const labels = refresh()[0][0];

  const data = {
      labels,
      datasets: [],
  };

  for (var tacha in refresh()[1]) {
    data.datasets.push({
        label: 'Valor',
        data: refresh()[1],
        borderColor: randomColor(),
        backgroundColor: randomColor(),
    })
  }

  if (isLoading) {
      return(
          <div className={classes.LinePlot}>
              <h1 className={classes.h1}>
                  Cargando datos ...
              </h1>
          </div>
      ) 
  }

  return(
    <div className={classes.LinePlot}>
      <Line options={options} data={data}/>
    </div>
  )

}

export default GlobalLineChartPlot;