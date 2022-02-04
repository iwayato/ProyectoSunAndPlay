import { Link } from "react-router-dom";
import classes from './Graph.module.css';
import LineChartPlot from "../Graphs/LineChartPlot";
import ScatterChartPlot from "../Graphs/ScatterChartPlot";
import VerticalBarPlot from "../Graphs/VerticalBarPlot";
import BubbleChartPlot from "../Graphs/BubbleChartPlot";

const Graphs = () => {

    return(

        <div>

            <div className={classes.Link}>
                <Link to="/" style={{ textDecoration: 'none' }}>Página principal</Link>
            </div>

            <div className={classes.Fila}>

                <div className={classes.Plots}>
                    <LineChartPlot></LineChartPlot>
                </div>

                <div className={classes.Plots}>
                    <ScatterChartPlot></ScatterChartPlot>
                </div>

            </div>

            <div className={classes.Fila}>

                <div className={classes.Plots}>
                    <VerticalBarPlot></VerticalBarPlot>
                </div>

                <div className={classes.Plots}>
                    <BubbleChartPlot></BubbleChartPlot>
                </div>

            </div>

        </div>

    )
}

export default Graphs;