import axios from 'axios';
import { useEffect, useState } from 'react';
import LineChartPlot from "../Graphs/LineChartPlot";
import classes from './GetData.module.css'

const GetData = (props) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [labels, setLabels] =  useState([]);

    const refresh = () => {

        axios.get(`https://tachas-web-api.herokuapp.com/data/${props.parametro}/${props.id}/false`).then((response) => {

            for (var key in response.data.data[0]) {
                if (response.data.data[0].hasOwnProperty(key)){
                    if (key !== 'id') {
                        // eslint-disable-next-line
                        setLabels(labels => [...labels, key])
                        // eslint-disable-next-line
                        setData(data => [...data, response.data.data[0][key]])
                    }
                }
            }

            setLoading(false);

        })
    };

    /* Permite esperar a que se obtengan todos los datos */
    useEffect(refresh, [props.id, props.parametro]);

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
        <div className={classes.Div}>
            <LineChartPlot
                id={props.id}
                data={data.slice(-10)}
                labels={labels.slice(-10)}
                varName={props.varName}
                borderColor={props.borderColor}
                backgroundColor={props.backgroundColor}>
            </LineChartPlot>
            <br></br>
            <button onClick={refresh}>
                Actualizar datos
            </button>
        </div>
    )

}

export default GetData;