import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import GetDataGlobal from './GetDataGlobal';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const randomColor = () => {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}

const GlobalLineChartPlot = (props) => {

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
  
  return(
    <GetDataGlobal
      parametro={parametro}
      title={title}
      borderColor={randomColor()}
      backgroundColor={randomColor()}
      inicioTachas={props.inicioTachas} 
      finalTachas={props.finalTachas}
      inicioFecha={props.inicioFecha}
      finalFecha={props.finalFecha}>
    </GetDataGlobal>
  ) 
}

export default GlobalLineChartPlot;