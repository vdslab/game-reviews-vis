import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

import Icon from "./Icon";

const ZoomableSVG = (props) => {
  const { children } = props;

  const svgRef = useRef();
  const [k, setK] = useState(1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  useEffect(() => {
    const zoom = d3.zoom().on("zoom", (event) => {
      const { x, y, k } = event.transform;
      setX(x);
      setY(y);
      setK(k);
    });
    d3.select(svgRef.current).call(zoom);
  }, []);
  return (
    <svg ref={svgRef} width={window.innerWidth} height={window.innerHeight}>
      <g transform={`translate(${x},${y})scale(${k})`}>{children}</g>
    </svg>
  );
};

const NodeLink = (props) => {
  const { data, selectGameIdx, setSelectGameIdx } = props;
  const k = 5;

  const [newLinks, setNewLinks] = useState([]);
  const [newNode, setNewNode] = useState([]);

  const nodes = Object.values(data).map((node, index) => ({
    id: index,
    name: node.name,
    header_image: node.header_image,
    wordcloud: node.wordcloud,
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

  const calcCommonGenres = (game1, game2) => {
    let count = 0;

    game1.forEach((item) =>
      game2.forEach((i) => {
        if (i.id === item.id) {
          count++;
        }
      })
    );
    return count;
  };

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
      setNewNode(
        nodes.map((node) => {
          return {
            x: node.x,
            y: node.y,
            name: node.name,
            header_image: node.header_image,
            index: node.index,
          };
        })
      );

      setNewLinks(
        links.map((link) => {
          const selectFlag =
            link.source.id === selectGameIdx ||
            link.target.id === selectGameIdx;
          return {
            ...link,
            color: selectFlag ? "skyblue" : "gray",
            width: selectFlag
              ? 0.008 *
                  (calcCommonGenres(link.source.genres, link.target.genres) +
                    1) *
                  calcWeight(link.source.TfIdf, link.target.TfIdf) +
                2
              : 0.008 *
                (calcCommonGenres(link.source.genres, link.target.genres) + 1) *
                calcWeight(link.source.TfIdf, link.target.TfIdf),
          };
        })
      );
    });
  }, []);

  return (
    <ZoomableSVG>
      {newLinks.length !== 0 &&
        newLinks.map((link, i) => (
          <line
            key={i}
            className="link"
            x1={link.source.x}
            y1={link.source.y}
            x2={link.target.x}
            y2={link.target.y}
            style={{ stroke: link.color, strokeWidth: link.width }}
          />
        ))}
      {newNode.length !== 0 &&
        newNode.map((node, i) => {
          return (
            <g transform={`translate(${node.x},${node.y})`} key={i}>
              <Icon
                name={node.name}
                header_image={node.header_image}
                index={node.index}
                setSelectGameIdx={setSelectGameIdx}
              ></Icon>
            </g>
          );
        })}
    </ZoomableSVG>
  );
};

export default NodeLink;
