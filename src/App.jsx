import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import WordCloud from "react-d3-cloud";
import { useState, useEffect } from "react";

import "./../index.css";
import Header from "./components/Header";
import FetchData from "./components/FetchData";
import NodeLink from "./components/NodeLink";

const App = () => {
  const [data, setData] = useState([]);
  const [addData, setAddData] = useState([]);
  const [selectWord, setSelectWord] = useState("");
  const [selectGameIdx, setSelectGameIdx] = useState(0);
  const [loading, setLoading] = useState(false);

  const genreMapping = {
    1: "Action",
    37: "Free to Play",
    2: "Strategy",
    25: "Adventure",
    23: "Indie",
    3: "RPG",
    51: "Animation & Modeling",
    58: "Video Production",
    4: "Casual",
    28: "Simulation",
    9: "Racing",
    73: "Violent",
    29: "Massively Multiplayer",
    72: "Nudity",
    18: "Sports",
    70: "Early Access",
    74: "Gore",
    57: "Utilities",
    52: "Audio Production",
    53: "Design & Illustration",
    59: "Web Publishing",
    55: "Photo Editing",
    54: "Education",
    56: "Software Training",
    71: "Sexual Content",
    60: "Game Development",
    50: "Accounting",
    81: "Documentary",
    84: "Tutorial",
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    height: "100%",
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const fontSizeMapper = (word) => Math.pow(word.value, 0.5) * 1.5;

  const getColor = (value) => {
    const blueflag = value > 0.5;
    const color = blueflag ? 240 : 0;
    const lightness = 50 + (blueflag ? Math.abs(value - 1) : value) * 100;
    return `hsl(${color}, 100%, ${lightness}%)`;
  };

  useEffect(() => {
    setLoading(false);
    // setSelectGameIdx(data.length-1);
    FetchData({ data, setData, addData, setSelectGameIdx });
  }, [, addData]);

  return (
    <div>
      <Header
        addData={addData}
        setAddData={setAddData}
        data={data}
        setSelectGameIdx={setSelectGameIdx}
      ></Header>
      <Grid container style={{ height: "calc(100vh - 60px)" }} spacing={0}>
        <Grid item xs={8}>
          <Item square>
            {(data.length !== 0 && data[0].TFIDF) || loading ? (
              <NodeLink
                data={data.map((item, i) => ({
                  name: item.name,
                  header_image: item.header_image,
                  index: i + 1,
                  wordcloud: item.wordcloud,
                  key: i,
                  reviews: item.reviews,
                  TfIdf: item.TFIDF,
                  genres: item.genres,
                }))}
                selectGameIdx={selectGameIdx}
                setSelectGameIdx={setSelectGameIdx}
              />
            ) : (
              <h2>Loading...</h2>
            )}
          </Item>
        </Grid>
        <Grid item xs={4} style={{ height: "100%" }}>
          <Item square>
            <div
              style={{
                height: "100%",
                backgroundColor: "lightgray",
                padding: "20px",
              }}
            >
              {data.length !== 0 ? (
                <div>
                  <Grid container spacing={0} justifyContent="flex-end">
                    <Grid item alignItems="center">
                      negative
                    </Grid>
                    <Grid item>
                      <Box
                        width="150px"
                        height="20px"
                        sx={{
                          backgroundImage:
                            "linear-gradient(to right, red 0%, white 50%, blue 100%)",
                        }}
                      />
                    </Grid>
                    <Grid item alignItems="stretch">
                      positive
                    </Grid>
                  </Grid>
                  {data[0].TFIDF ? (
                    <div style={{ marginTop: "50px" }}>
                      <WordCloud
                        data={data[selectGameIdx].TFIDF}
                        fontSize={fontSizeMapper}
                        width={100}
                        height={100}
                        rotate={0}
                        padding={0}
                        // onWordClick={(_, d) => setSelectWord(d.text)}
                        fill={(word) => getColor(word.rating)}
                      ></WordCloud>
                    </div>
                  ) : (
                    <h2>Loading...</h2>
                  )}

                  <div
                    style={{
                      fontSize: "30px",
                    }}
                  >
                    {data[selectGameIdx].name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "16px",
                    }}
                  >
                    {data[selectGameIdx].genres.map((genre, index) => (
                      <div key={index} style={{ marginRight: "10px" }}>
                        {genreMapping[genre.id]}
                      </div>
                    ))}
                  </div>
                </div>
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
