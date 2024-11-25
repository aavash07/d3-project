import React, { useEffect } from "react";
import * as d3 from "d3";
import data from "../data/ships.json"; // Ensure the dataset is correctly loaded.

const Task3TopShipClasses = () => {
  useEffect(() => {
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };

    // Aggregate and sort ship counts by class
    const classCounts = d3.rollup(
      data,
      (v) => v.length,
      (d) => d["Ship Class"]
    );
    const sortedClasses = Array.from(classCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20); // Top 20

    const svg = d3
      .select("#top-ship-classes")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X Scale
    const x = d3
      .scaleBand()
      .domain(sortedClasses.map((d) => d[0]))
      .range([0, width])
      .padding(0.1);

    // Y Scale
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(sortedClasses, (d) => d[1])])
      .nice()
      .range([height, 0]);

    // X Axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // Y Axis
    svg.append("g").call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll(".bar")
      .data(sortedClasses)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d[0]))
      .attr("y", (d) => y(d[1]))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d[1]))
      .attr("fill", "steelblue");
  }, []);

  return (
    <div>
      <h2>Task 3: Top 20 Ship Classes</h2>
      <svg id="top-ship-classes"></svg>
    </div>
  );
};

export default Task3TopShipClasses;
