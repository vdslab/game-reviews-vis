import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import Icon from "./Icon";

const NodeLink = ({ props }) => {
  const chartRef = useRef();

  const nodes = Object.values(props).map((node, index) => ({
    id: index,
    name: node.name,
    header_image: node.header_image,
    setSelectGameIdx: node.setSelectGameIdx,
    x: node.x,
    y: node.y,
  }));

  const links = [
    { source: 0, target: 1 },
    { source: 1, target: 2 },
  ];

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const svg = d3.select(chartRef.current);

    svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .style("stroke", "#999")
      .style("stroke-width", 2);

    const nodeElements = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node");
    // .call(
    //   d3
    //     .drag()
    //     .on("start", dragstarted)
    //     .on("drag", dragged)
    //     .on("end", dragended)
    // );

    nodeElements
      .append("image")
      .attr("href", (d) => d.header_image)
      .attr("width", 75)
      .attr("height", 60)
      .attr("x", -37.5)
      .attr("y", -30)
      .on("click", (event, d) => handleIconClick(d));

    nodeElements
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 40)
      .text((d) => d.name);

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2));

    simulation.on("tick", () => {
      svg
        .selectAll(".link")
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      nodeElements.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    simulation.restart();
  }, [nodes]);

  // const dragstarted = (event, d) => {
  //   if (!event.active) simulation.alphaTarget(0.3).restart();
  //   d.fx = d.x;
  //   d.fy = d.y;
  // };

  // const dragged = (event, d) => {
  //   d.fx = event.x;
  //   d.fy = event.y;
  // };

  // const dragended = (event, d) => {
  //   if (!event.active) simulation.alphaTarget(0);
  //   d.fx = null;
  //   d.fy = null;
  // };

  const handleIconClick = (node) => {
    node.setSelectGameIdx(node.id);
  };

  return (
    <svg ref={chartRef} width={window.innerWidth} height={window.innerHeight}>
      <g className="links"></g>
      <g className="nodes"></g>
    </svg>
  );
};

export default NodeLink;
