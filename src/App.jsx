import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import WordCloud from "react-d3-cloud";
import { useState, useEffect } from "react";

import Header from "./components/Header";
import Icon from "./components/Icon";
import FetchData from "./components/FetchData";
import NodeLink from "./components/NodeLink";

const App = () => {
  const [data, setData] = useState([]);
  const [selectGameIdx, setSelectGameIdx] = useState(0);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    height: "100%",
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  // フォントの大きさを決める関数
  const fontSizeMapper = (word) => Math.pow(word.value, 0.5) * 1.5;

  const getColor = (value) => {
    const blueflag = value > 0.5;
    const color = blueflag ? 240 : 0;
    const lightness = 50 + (blueflag ? Math.abs(value - 1) : value) * 100;
    return `hsl(${color}, 100%, ${lightness}%)`;
  };

  useEffect(() => {
    FetchData({ setData });
  }, []);

  return (
    <div>
      <Header></Header>
      <Grid container style={{ height: "calc(100vh - 90px)" }} spacing={0}>
        <Grid item xs={8}>
          <Item square>
            {data.length !== 0 ? (
              data.map((item, i) => {
                return (
                  <Icon
                    name={item.name}
                    header_image={item.header_image}
                    index={i + 1}
                    setSelectGameIdx={setSelectGameIdx}
                    key={i}
                  ></Icon>
                );
              })
            ) : (
              <h2>Loading...</h2>
            )}
            {data.length !== 0 && <NodeLink data={data}></NodeLink>}
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item square>
            <div style={{ backgroundColor: "lightgray" }}>
              {data.length !== 0 ? (
                <WordCloud
                  data={data[selectGameIdx].wordcloud}
                  fontSize={fontSizeMapper}
                  width={100}
                  height={100}
                  rotate={0}
                  fill={(word) => getColor(word.rating)}
                ></WordCloud>
              ) : (
                <h2>Loading...</h2>
              )}
            </div>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
