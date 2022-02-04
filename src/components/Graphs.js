import { Link } from "react-router-dom";
import classes from './Graph.module.css';
import LineChartPlot from "../Graphs/LineChartPlot";
import ScatterChartPlot from "../Graphs/ScatterChartPlot";
import VerticalBarPlot from "../Graphs/VerticalBarPlot";
import BubbleChartPlot from "../Graphs/BubbleChartPlot";

const Graphs = () => {

    return(

        <div>

            <Link to="/">Página principal</Link>

            <div className={classes.FilaUno}>

                <div className={classes.Plots}>
                    <LineChartPlot></LineChartPlot>
                </div>

                <div className={classes.Plots}>
                    <ScatterChartPlot></ScatterChartPlot>
                </div>

            </div>

            <div className={classes.FilaDos}>

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