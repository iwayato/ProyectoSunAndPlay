import axios from 'axios';
import { useEffect, useState } from 'react';
import LineChartPlot from "../Graphs/LineChartPlot";
import classes from '../Graphs/Plot.module.css'

const GetData = (props) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [labels, setLabels] =  useState([]);

    useEffect(() => {

        const interval = setInterval(() => {

            axios.get(`http://localhost:3001/data/${props.parametro}/${props.id}`).then((response) => {

                for (var key in response.data.data[0]) {
                    if (response.data.data[0].hasOwnProperty(key)){
                        if (key !== 'id') {
                            setLabels(labels => [...labels, key])
                            setData(data => [...data, response.data.data[0][key]])
                        }
                    }
                }

                setLoading(false)

            });

        }, 240000);

        return () => {clearInterval(interval)};

    }, [props.parametro, props.id]);

    if (isLoading) {
        return(
            <div className={classes.LinePlot}>
                Cargando datos...
            </div>
        ) 
    }

    return(
        <LineChartPlot
            id={props.id}
            data={data.slice(-10)}
            labels={labels.slice(-10)}
            varName={props.varName}
            borderColor={props.borderColor}
            backgroundColor={props.backgroundColor}>
        </LineChartPlot>
    )

}

export default GetData;