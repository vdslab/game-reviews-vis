import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

import Icon from "./Icon";

const NodeLink = (props) => {
  const { data, selectGameIdx, setSelectGameIdx } = props;
  const svgRef = useRef();
  const chartRef = useRef();
  const k = 5;

  const [z, setZ] = useState(1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const nodes = Object.values(data).map((node, index) => ({
    id: index,
    name: node.name,
    header_image: node.header_image,
    wordcloud: node.wordcloud,
    setSelectGameIdx: node.setSelectGameIdx,
    TfIdf: node.TfIdf,
    genres: node.genres,
  }));
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
        sum += (value, map2.get(text)) / 2;
      }
    });

    return sum;
  };
  // console.log(props);
  console.log(nodes);

  const calcCommonGenres = (game1, game2) => {
    var count = 0;

    game1.forEach((item) =>
      game2.forEach((i) => {
        if (i.id === item.id) {
          count++;
        }
      })
    );
    return count;
  };

  // console.log(links);
  // const threshold = 5;
  // const res = {};
  // nodes.forEach((from, i) => {
  //   if (i !== nodes.length - 1) {
  //     const r = [];
  //     for (let j = 0; j < nodes.length; j++) {
  //       if (i === j) {
  //         continue;
  //       }
  //       const to = nodes[j];
  //       const weight = calcWeight(from.TfIdf, to.TfIdf);
  //       r.push({ weight, id: to.id });
  //     }
  //     r.sort((a, b) => a.weight - b.weight);
  //     res[from.id] = r.slice(0, threshold);
  //   }
  // });

  // console.log(res);
  // const links = [];
  // nodes.forEach((from, i) => {
  //   const fid = from.id;
  //   if (fid in res) {
  //     console.log(res[fid]);
  //     res[fid].forEach((t) => {
  //       links.push({
  //         source: fid,
  //         target: t.id,
  //         weight: t.weight,
  //       });
  //     });
  //   }
  // });
  // const dup = []
  // links.forEach((f, i) => {
  //   links.forEach(t => {
  //     // かぶってるやつを消す
  //   })
  // })

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const links = [];

    for (let i = 0; i < nodes.length; i++) {
      const c =
        k -
        links.filter((item) => item.source === i || item.target === i).length;
      const ngIndex = links
        .filter((item) => item.target === i)
        .map((item) => item.source);

      const array = nodes
        .map((node, index) => {
          return {
            index,
            weight:
              i !== index
                ? (calcCommonGenres(nodes[i].genres, node.genres) + 1) *
                  calcWeight(nodes[i].TfIdf, node.TfIdf)
                : 0,
          };
        })
        .filter((e) => e);
      array.sort((a, b) => b.weight - a.weight);
      const newArray = array
        .slice(0, c)
        .map((item) => item.index)
        .filter((index) => !ngIndex.find((i) => i === index));

      newArray.forEach((index) => {
        const count = links.filter((item) => item.target === index).length;
        if (count < 5) {
          links.push({ source: i, target: index });
        }
      });
    }

    const svg = d3.select(chartRef.current);

    svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .style("stroke", "gray");
    // .style("stroke-width", {stroke});

    const nodeElements = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node");

    nodeElements.each((node, index, nodes) => {
      // ここで条件をチェックして、表示方法を決定
      const displayCondition = index === selectGameIdx;
      const useImage = displayCondition ? true : false;

      // ノードに基づいて表示する要素を追加
      const nodeElement = d3.select(nodes[index]);

      if (useImage) {
        // 条件が満たされた場合は画像を表示
        nodeElement
          .append("defs")
          .append("clipPath")
          .attr("id", `clip-${index}`)
          .append("circle")
          .attr("r", 17);

        nodeElement
          .append("circle")
          .attr("r", 21)
          .style("stroke", "skyblue") // 枠線の色
          .style("stroke-width", 4);

        nodeElement
          .append("image")
          .attr("href", node.header_image)
          .attr("width", 75)
          .attr("height", 60)
          .attr("x", -37.5)
          .attr("y", -30)
          .attr("clip-path", `url(#clip-${index})`)
          .on("click", (event, d) => handleIconClick(d));

        // 枠線の太さ
      } else {
        // 条件が満たされない場合は代替の要素を表示
        nodeElement
          .append("defs")
          .append("clipPath")
          .attr("id", `clip-${index}`)
          .append("circle")
          .attr("r", 17);

        nodeElement
          .append("image")
          .attr("href", node.header_image)
          .attr("width", 75)
          .attr("height", 60)
          .attr("x", -37.5)
          .attr("y", -30)
          .attr("clip-path", `url(#clip-${index})`)
          .on("click", (event, d) => handleIconClick(d));
      }
    });
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance((item) => {
            return (
              0.1 *
              (calcCommonGenres(item.source.genres, item.target.genres) + 1) *
              calcWeight(item.source.TfIdf, item.target.TfIdf)
            );
          })
      )

      .force("charge", d3.forceManyBody().strength(-1000))
      .force("center", d3.forceCenter(width / 3, height / 2));

    simulation.on("tick", () => {
      // console.log(links);
      svg
        .selectAll(".link")
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y)
        .style(
          "stroke-width",
          (d) =>
            0.008 *
            (calcCommonGenres(d.source.genres, d.target.genres) + 1) *
            calcWeight(d.source.TfIdf, d.target.TfIdf)
        );

      /* .attr("y2", (d) => d.target.y)
        .style("stroke", (d) => {
          const selectFlag =
            d.source.id === selectGameIdx || d.target.id === selectGameIdx;
          return selectFlag ? "skyblue" : "gray";
        })
        .style("stroke-width", (d) => {
          const selectFlag =
            d.source.id === selectGameIdx || d.target.id === selectGameIdx;
          return selectFlag ? "3" : "0.5";
        }); */

      nodeElements.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    simulation.restart();
  }, []);

  useEffect(() => {
    const zoom = d3.zoom().on("zoom", (event) => {
      const { x, y, k } = event.transform;
      setX(x);
      setY(y);
      setZ(k);
    });
    d3.select(svgRef.current).call(zoom);
  }, []);

  const handleIconClick = (node) => {
    setSelectGameIdx(node.id);
  };

  return (
    <svg ref={svgRef} width={window.innerWidth} height={window.innerHeight}>
      <g ref={chartRef} transform={`translate(${x},${y})scale(${z})`}>
        <g className="link">
          {/* {links.length !== 0 &&
            links.map((link, i) => (
              <line
                key={i}
                className="link"
                x1={link.source.x}
                y1={link.source.y}
                x2={link.target.x}
                y2={link.target.y}
                style={{ stroke: "gray", strokeWidth: 0.5 }}
              />
            ))} */}
        </g>
      </g>
    </svg>
  );
};

export default NodeLink;
