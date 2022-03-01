import { Link } from "react-router-dom";
import classes from './Graph.module.css';
import GlobalLineChartPlot from "../Graphs/GlobalLineChartPlot";
import { useState } from "react";

const Graphs = () => {

    const [inicioTachas, setInicioTachas] = useState(0);
    const [finalTachas, setFinalTachas] = useState(0);
    const [numFechas, setNumFechas] = useState(100);
    const [temp, setTemp] = useState(false);
    const [hum, setHum] = useState(false);
    const [acel, setAcel] = useState(false);

    const tachasInicioHandler = (event) => {
        setInicioTachas([Number(event.target.value)]);
    }

    const tachasFinalHandler = (event) => {
        setFinalTachas([Number(event.target.value)]);
    }

    const numFechasHandler = (event) => {
        setNumFechas([Number(event.target.value)]);
    }

    const setTempHandler = () => {
        setTemp(!temp);
        setHum(false);
        setAcel(false);
    }
    
    const setHumHandler = () => {
        setTemp(false);
        setHum(!hum);     
        setAcel(false);
    }
   
    const setAcelHandler = () => {
        setTemp(false);
        setHum(false); 
        setAcel(!acel);  
    }
        
    return(

        <div className={classes.MainDiv}>

            <div className={classes.Link}>

                <Link to="/" style={{ textDecoration: 'none' }} className={classes.Padding}>Página principal</Link>
                
                <label className={classes.LabelRadioInput}>Temperatura : </label>
                <input
                    type='radio'
                    name='param'
                    onChange={setTempHandler}
                >
                </input>

                <label className={classes.LabelRadioInput}>Humedad: </label>
                <input 
                    type='radio'
                    name='param'
                    onChange={setHumHandler}
                >
                </input>

                <label className={classes.LabelRadioInput}>Aceleración: </label>
                <input 
                    type='radio' 
                    name='param'
                    onChange={setAcelHandler}
                > 
                </input>
                
                
                <label className={classes.Label}>Tachas a mostrar :</label>
                <input
                    className={classes.Input}
                    type='number'
                    name='tachas_sel'
                    value={inicioTachas}
                    onChange={tachasInicioHandler}
                    min={0}>       
                </input>

                <label>a</label>

                <input
                    className={classes.Input}
                    type='number'
                    name='tachas_sel'
                    value={finalTachas}
                    onChange={tachasFinalHandler}
                    min={0}>       
                </input>

                <label className={classes.Label}>Fechas a mostrar :</label>

                <input
                    className={classes.Input}
                    type='number'
                    name='tachas_sel'
                    value={numFechas}
                    onChange={numFechasHandler}
                    min={0}>       
                </input>

            </div>

            <div className={classes.Plots}>
                <GlobalLineChartPlot
                    inicioTachas={inicioTachas} 
                    finalTachas={finalTachas}
                    numFechas={numFechas}
                    tempSel={temp}
                    humSel={hum}
                    acelSel={acel}>
                </GlobalLineChartPlot>
            </div>

        </div>

    )
}

export default Graphs;