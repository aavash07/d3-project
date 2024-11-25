import React, { useEffect } from "react";
import * as d3 from "d3";
import data from "../data/ships.json";

const Task2LBRComparison = () => {
  useEffect(() => {
    const width = 600;
    const height = 400;

    // Compute Length-to-Beam Ratio (LBR)
    const shipData = data.map((d) => ({
      ...d,
      LBR: parseFloat(d.Length) / parseFloat(d.Beam),
    }));

    const shipTypes = ["Battleship", "Cruiser", "Carrier"];
    const shipTypeLBR = shipTypes.map((type) => {
      const ships = shipData.filter((d) => d["Ship Class"].includes(type));
      const LBRs = ships.map((d) => d.LBR);
      const q1 = d3.quantile(LBRs, 0.25);
      const q3 = d3.quantile(LBRs, 0.75);
      const avg = d3.mean(LBRs);

      return { type, avg, q1, q3 };
    });

    // Create SVG container
    const svg = d3.select("#lbr-comparison")
      .attr("width", width)
      .attr("height", height);

    // Scales
    const x = d3.scaleBand()
      .domain(shipTypes)
      .range([0, width])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(shipTypeLBR, (d) => d.q3)])
      .range([height, 0]);

    // Axes
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));

    // Draw bars
    svg.selectAll(".bar")
      .data(shipTypeLBR)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.type))
      .attr("y", (d) => y(d.q3))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(d.q1) - y(d.q3))
      .attr("fill", "lightblue");

    svg.selectAll(".label-type")
      .data(shipTypeLBR)
      .enter()
      .append("text")
      .attr("class", "label-type")
      .attr("x", (d) => x(d.type) + x.bandwidth() / 2)
      .attr("y", height - 10)  // Place below the bars, or adjust as needed
      .attr("text-anchor", "middle")
      .text((d) => d.type)
      .style("font-size", "12px")
      .style("fill", "black");

    svg.selectAll(".label-avg")
      .data(shipTypeLBR)
      .enter()
      .append("text")
      .attr("class", "label-avg")
      .attr("x", (d) => x(d.type) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.avg) - 5)  // Slightly above the bar
      .attr("text-anchor", "middle")
      .text((d) => d.avg.toFixed(2))  // Display the average LBR with 2 decimal places
      .style("font-size", "12px")
      .style("fill", "black");

  }, []);

  return (
    <div>
      <h2>Task 2: Length-to-Beam Ratio</h2>
      <svg id="lbr-comparison"></svg>
    </div>
  );
};

export default Task2LBRComparison;
