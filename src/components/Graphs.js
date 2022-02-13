import { Link } from "react-router-dom";
import classes from './Graph.module.css';
import GlobalLineChartPlot from "../Graphs/GlobalLineChartPlot";
import GlobalScatterChartPlot from "../Graphs/GlobalScatterChartPlot";
import GlobalVerticalBarPlot from "../Graphs/GlobalVerticalBarPlot";
import GlobalBubbleChartPlot from "../Graphs/GlobalBubbleChartPlot";
import getData from "./getData";

const Graphs = () => {

    // como obtener la informacion

    return(

        <div className={classes.MainDiv}>

            <div className={classes.Link}>
                <Link to="/" style={{ textDecoration: 'none' }}>Página principal</Link>
            </div>

            <div className={classes.Fila}>

                <div className={classes.Plots}>
                    <GlobalLineChartPlot></GlobalLineChartPlot>
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