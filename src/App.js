import React from "react";
import Task1Histogram from "./components/Task1Histogram";
import Task2LBRComparison from "./components/Task2LBRComparison";
import Task3TopShipClasses from "./components/Task3TopShipClasses";
import Task4ScatterPlot from "./components/Task4ScatterPlot";

const App = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Ship Data Visualization</h1>
      <Task1Histogram />
      <Task2LBRComparison />
      <Task3TopShipClasses />
      <Task4ScatterPlot />
    </div>
  );
};

export default App;
