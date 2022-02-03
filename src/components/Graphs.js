import { Link } from "react-router-dom";
import classes from './Graph.module.css';
import LineChartPlot from "../Graphs/LineChartPlot";
import ScatterChartPlot from "../Graphs/ScatterChartPlot";
import VerticalBarPlot from "../Graphs/VerticalBarPlot";
import PieChartPlot from "../Graphs/PieChartPlot";

const Graphs = () => {

    return(
        <div className={classes.MainDiv}>

            <Link to="/">Página principal</Link>

            <div>
                <LineChartPlot></LineChartPlot>
            </div>

            <div>
                <ScatterChartPlot></ScatterChartPlot>
            </div>
                
            <div>
                <VerticalBarPlot></VerticalBarPlot>
            </div>

            <div>
                <PieChartPlot></PieChartPlot>
            </div>

        </div>
    )
}

export default Graphs;