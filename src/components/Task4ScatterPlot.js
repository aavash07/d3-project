import React, { useEffect } from "react";
import * as d3 from "d3";
import data from "../data/ships.json"; // Ensure the dataset is correctly loaded.

const Task4ScatterPlot = () => {
  useEffect(() => {
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };

    // Parse displacement and speed
    const getDisplacement = (ship) => {
      if (!ship.Displacement) return null;
      const parts = ship.Displacement.split(" ");
      return parts[0] ? parseFloat(parts[0].replace(/,/g, "")) : null;
    };

    const getSpeed = (ship) => {
      if (!ship.Speed) return null;
      return parseFloat(ship.Speed.split(" ")[0]);
    };

    const parsedData = data
      .map((d) => ({
        displacement: getDisplacement(d),
        speed: getSpeed(d),
      }))
      .filter((d) => d.displacement && d.speed);

    const svg = d3
      .select("#scatterplot")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X Scale
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(parsedData, (d) => d.displacement)])
      .nice()
      .range([0, width]);

    // Y Scale
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(parsedData, (d) => d.speed)])
      .nice()
      .range([height, 0]);

    // X Axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Y Axis
    svg.append("g").call(d3.axisLeft(y));

    // Points
    svg
      .selectAll(".dot")
      .data(parsedData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.displacement))
      .attr("cy", (d) => y(d.speed))
      .attr("r", 5)
      .attr("fill", "orange")
      .attr("opacity", 0.7);
  }, []);

  return (
    <div>
      <h2>Task 4: Scatterplot</h2>
      <svg id="scatterplot"></svg>
    </div>
  );
};

export default Task4ScatterPlot;
