import React, { useEffect } from "react";
import * as d3 from "d3";
import data from "../data/ships.json"; // Ensure your dataset is correctly loaded.

const Task1Histogram = () => {
  useEffect(() => {
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    // Filter by countries
    const japanShips = data.filter((d) => d.Country === "Japan");
    const usShips = data.filter((d) => d.Country === "United States");

    // Extract displacement in standard tons
    const getDisplacement = (ship) => {
      if (!ship.Displacement) return null; // Handle missing Displacement field
      const parts = ship.Displacement.split(" "); // Safely split the Displacement string
      return parts[0] ? parseFloat(parts[0].replace(/,/g, "")) : null;
    };

    const japanDisplacement = japanShips
      .map(getDisplacement)
      .filter((value) => value !== null); // Filter out null values
    const usDisplacement = usShips
      .map(getDisplacement)
      .filter((value) => value !== null); // Filter out null values

    // Create SVG container
    const svg = d3
      .select("#histogram")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create histogram bins
    const x = d3.scaleLinear().domain([0, 50000]).range([0, width]);
    const histogram = d3.histogram().domain(x.domain()).thresholds(x.ticks(20));

    const japanBins = histogram(japanDisplacement);
    const usBins = histogram(usDisplacement);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max([...japanBins, ...usBins], (d) => d.length)])
      .range([height, 0]);

    // Add axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    // Add Japanese ship bars
    svg
      .selectAll(".japan-bar")
      .data(japanBins)
      .enter()
      .append("rect")
      .attr("class", "japan-bar")
      .attr("x", (d) => Math.max(0, x(d.x0))) // Ensure non-negative x
      .attr("y", (d) => y(d.length))
      .attr("width", (d) => Math.max(0, x(d.x1) - x(d.x0) - 1)) // Ensure non-negative width
      .attr("height", (d) => height - y(d.length))
      .attr("fill", "steelblue");

    // Add US ship bars
    svg
      .selectAll(".us-bar")
      .data(usBins)
      .enter()
      .append("rect")
      .attr("class", "us-bar")
      .attr("x", (d) => Math.max(0, x(d.x0))) // Ensure non-negative x
      .attr("y", (d) => y(d.length))
      .attr("width", (d) => Math.max(0, x(d.x1) - x(d.x0) - 1)) // Ensure non-negative width
      .attr("height", (d) => height - y(d.length))
      .attr("fill", "orange")
      .attr("opacity", 0.7);
  }, []);

  return (
    <div>
      <h2>Task 1: Histogram</h2>
      <svg id="histogram"></svg>
    </div>
  );
};

export default Task1Histogram;
