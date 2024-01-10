import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const NodeLink = ({ props }) => {
  const chartRef = useRef();
  console.log(props);
  const nodes = Object.values(props).map((node, index) => ({
    id: index,
    name: node.name,
    header_image: node.header_image,
  }));
  console.log(props);

  const links = [
    { source: 0, target: 1 },
    { source: 1, target: 2 },
  ];

  console.log(nodes);
  useEffect(() => {
    // 画面サイズの取得
    const width = window.innerWidth;
    const height = window.innerHeight;

    // ノードの初期位置を画面の中央に設定
    nodes.forEach((node) => {
      node.x = width / 2;
      node.y = height / 2;
    });

    // D3.jsのコード
    const svg = d3.select(chartRef.current);

    // リンクの描画
    svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .style("stroke", "#999")
      .style("stroke-width", 2);

    // ノードの描画
    svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("image")
      .attr("class", "node")
      .attr("href", (d) => d.header_image)
      .attr("width", 75)
      .attr("height", 60);

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(10)
      )
      .force("charge", d3.forceManyBody().strength(100))
      .force("center", d3.forceCenter(width / 2, height / 2));

    simulation.on("tick", () => {
      // ノードとエッジの位置の更新
      svg
        .selectAll(".line")
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      svg
        .selectAll(".node")
        .attr("x", (d) => d.x - 20)
        .attr("y", (d) => d.y - 20);
    });

    // シミュレーションの開始
    simulation.restart();
  }, [nodes]);

  return (
    <svg ref={chartRef} width={window.innerWidth} height={window.innerHeight}>
      <g className="links"></g>
      <g className="nodes"></g>
    </svg>
  );
};

export default NodeLink;
