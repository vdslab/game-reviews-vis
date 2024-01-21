import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import Icon from "./Icon";

const NodeLink = (props) => {
  const { data, selectGameIdx } = props;
  const chartRef = useRef();

  const nodes = Object.values(data).map((node, index) => ({
    id: index,
    name: node.name,
    header_image: node.header_image,
    wordcloud: node.wordcloud,
    setSelectGameIdx: node.setSelectGameIdx,
  }));

  const links = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      links.push({ source: i, target: j });
    }
  }

  const calcWeight = (arr1, arr2) => {
    const map1 = new Map();
    const map2 = new Map();

    arr1.forEach((item) => {
      if (!map1.has(item.text) || map1.get(item.text) > item.value) {
        map1.set(item.text, item.value);
      }
    });

    arr2.forEach((item) => {
      if (!map2.has(item.text) || map2.get(item.text) > item.value) {
        map2.set(item.text, item.value);
      }
    });

    let sum = 0;

    map1.forEach((value, text) => {
      if (map2.has(text)) {
        sum += Math.min(value, map2.get(text));
      }
    });

    return sum;
  };

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
      .style("stroke", "gray")
      .style("stroke-width", 1);

    const nodeElements = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g") //
      .attr("class", "node"); //

    nodeElements
      .append("image")
      .attr("href", (d) => d.header_image)
      .attr("width", 75)
      .attr("height", 60)
      .attr("x", -37.5)
      .attr("y", -30)
      .on("click", (event, d) => handleIconClick(d));

    /* nodeElements
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 40)
      .text((d) => d.name); */

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance((item) => {
            return (
              10 * calcWeight(item.source.wordcloud, item.target.wordcloud)
            );
          })
      )
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 3, height / 2));

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

  const handleIconClick = (node) => {
    node.setSelectGameIdx(node.id);
  };

  return (
    <svg ref={chartRef} width={window.innerWidth} height={window.innerHeight}>
      <g className="links">
        {links.map((link, i) => (
          <line
            key={i}
            className="link"
            /*             x1={link.source.x}
            y1={link.source.y}
            x2={link.target.x}
            y2={link.target.y} */
            style={{ stroke: "#999", strokeWidth: 0.5 }}
          />
        ))}
      </g>
      <g className="nodes">
        {nodes.map((node, i) => {
          return node.x !== undefined ? (
            <g
              className="node"
              transform={`translate(${node.x},${node.y})`}
              key={i}
            >
              <image
                href={node.header_image}
                width="75"
                height="60"
                x="-37.5"
                y="-30"
              ></image>
            </g>
          ) : (
            <div key={i}></div>
          );
        })}
      </g>
    </svg>
  );
};

export default NodeLink;
