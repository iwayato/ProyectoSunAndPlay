import { Link } from "react-router-dom";
import classes from './Graph.module.css';
import GlobalLineChartPlot from "../Graphs/GlobalLineChartPlot";
import GlobalScatterChartPlot from "../Graphs/GlobalScatterChartPlot";
import GlobalVerticalBarPlot from "../Graphs/GlobalVerticalBarPlot";
import GlobalBubbleChartPlot from "../Graphs/GlobalBubbleChartPlot";
import getData from "./getData";

const Graphs = () => {

    const numTachas = 21;
    const labels = [];
    labels.push(getData('temperatura', 1)[0]);

    const temps = [];
    const hums = [];
    const acels = [];

    ['temperatura', 'humedad', 'aceleracion'].forEach((param) => {
        for (let m = 1; m <= numTachas; m++) {
            if (param === 'temperatura') {
                temps.push(getData(param, m)[1]);
            }
            if (param === 'humedad') {
                hums.push(getData(param, m)[1]);
            }
            if (param === 'aceleracion') {
                acels.push(getData(param, m)[1]);
            }
        }
    })

    return(

        <div className={classes.MainDiv}>

            <div className={classes.Link}>
                <Link to="/" style={{ textDecoration: 'none' }}>Página principal</Link>
            </div>

            <div className={classes.Fila}>

                <div className={classes.Plots}>
                    <GlobalLineChartPlot labels={labels} temps={temps} hums={hums} acels={acels}></GlobalLineChartPlot>
                </div>

                <div className={classes.Plots}>
                    <GlobalScatterChartPlot></GlobalScatterChartPlot>
                </div>

            </div>

            <div className={classes.Fila}>

                <div className={classes.Plots}>
                    <GlobalVerticalBarPlot></GlobalVerticalBarPlot>
                </div>

                <div className={classes.Plots}>
                    <GlobalBubbleChartPlot></GlobalBubbleChartPlot>
                </div>

            </div>

        </div>

    )
}

export default Graphs;