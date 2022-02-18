import axios from 'axios';
import { useEffect, useState } from 'react';
import LineChartGlobal from "../Graphs/LineChartGlobal";
import classes from './LineChartGlobal.module.css'

const GetDataGlobal = (props) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [labels, setLabels] =  useState([]);

    const refresh = () => {

        axios.get(`http://localhost:3001/data/${props.parametro}/1/true/${props.inicioTachas}/${props.finalTachas}`).then((response) => {
        
            for (var tacha in response.data.data) {
                for (var fecha in response.data.data[tacha]) {
                    if (fecha !== 'id') {
                        setLabels(labels => [...labels, fecha]);
                        setData(data => [...data, fecha[tacha]]);
                    }
                }
            }

            setLoading(false);

        })

    };

    useEffect(refresh, [props.parametro, props.inicioTachas, props.finalTachas]);

    if (isLoading) {
        return(
            <div className={classes.Message}>
                <h1>
                    Cargando datos ...
                </h1>
            </div>
        ) 
    }

    return(
        <div className={classes.Div}>
            <LineChartGlobal
                data={data}
                labels={labels.slice(props.inicioFecha, props.finalFecha)}
                title={props.title}
                borderColor={props.borderColor}
                backgroundColor={props.backgroundColor}>
            </LineChartGlobal>
            <br></br>
            <button onClick={refresh}>
                Actualizar datos
            </button>
        </div>
    )

}

export default GetDataGlobal;