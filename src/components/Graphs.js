import { Link } from "react-router-dom";
import classes from './Graph.module.css';
import GlobalLineChartPlot from "../Graphs/GlobalLineChartPlot";
import { useState } from "react";
// import GlobalScatterChartPlot from "../Graphs/GlobalScatterChartPlot";
// import GlobalVerticalBarPlot from "../Graphs/GlobalVerticalBarPlot";
// import GlobalBubbleChartPlot from "../Graphs/GlobalBubbleChartPlot";

const Graphs = () => {

    const [inicioTachas, setInicioTachas] = useState(0);
    const [finalTachas, setFinalTachas] = useState(1);
    const [inicioFecha, setInicioFecha] = useState(0);
    const [finalFecha, setFinalFecha] = useState(2);
    const [temp, setTemp] = useState(false);
    const [hum, setHum] = useState(false);
    const [acel, setAcel] = useState(false);

    const tachasInicioHandler = (event) => {
        setInicioTachas([Number(event.target.value)]);
    }

    const tachasFinalHandler = (event) => {
        setFinalTachas([Number(event.target.value)]);
    }

    const fechaInicioHandler = (event) => {
        setInicioFecha([Number(event.target.value)]);
    }

    const fechaFinalHandler = (event) => {
        setFinalFecha([Number(event.target.value)]);
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
                
                <label className={classes.CustomLabel}>Mostrar</label>

                <input
                    className={classes.Input}
                    type='number'
                    name='tachas_sel'
                    value={finalTachas}
                    onChange={tachasFinalHandler}
                    min={1}>       
                </input>

                <label>tachas a partir de la tacha</label>

                <input
                    className={classes.Input}
                    type='number'
                    name='tachas_sel'
                    value={inicioTachas}
                    onChange={tachasInicioHandler}
                    min={0}>       
                </input>

                <label className={classes.Label}>Seleccione las fechas a mostrar :</label>

                <input
                    className={classes.Input}
                    type='number'
                    name='tachas_sel'
                    value={inicioFecha}
                    onChange={fechaInicioHandler}
                    min={0}>       
                </input>

                <label>Hasta</label>

                <input
                    className={classes.Input}
                    type='number'
                    name='tachas_sel'
                    value={finalFecha}
                    onChange={fechaFinalHandler}
                    min={2}>       
                </input>

            </div>

            <div className={classes.Fila}>

                <div className={classes.Plots}>
                    <GlobalLineChartPlot
                        inicioTachas={inicioTachas} 
                        finalTachas={finalTachas}
                        inicioFecha={inicioFecha}
                        finalFecha={finalFecha}
                        tempSel={temp}
                        humSel={hum}
                        acelSel={acel}>
                    </GlobalLineChartPlot>
                </div>

            </div>

        </div>

    )
}

export default Graphs;