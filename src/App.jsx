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
import { TfIdf } from "./components/TfIdf";

const App = () => {
  const [data, setData] = useState([]);
  const [addData, setAddData] = useState([]);
  const [selectWord, setSelectWord] = useState("");
  const [selectGameIdx, setSelectGameIdx] = useState(0);
  const [TFIDF, setTFIDF] = useState([]);
  const [loading, setLoading] = useState(false);

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
    FetchData({ setData, addData, setSelectGameIdx });
  }, [, addData]);

  useEffect(() => {
    if (data.length !== 0) {
      setTFIDF(TfIdf(data));
    }
  }, [data]);

  useEffect(() => {
    data.forEach((item, index) => {
      item.TFIDF = TFIDF[index];
  
      item.TFIDF.forEach((tfidfword) => {
        const findWord = item.wordcloud.find(
          (word) => word.text === tfidfword.text
        );
        if (findWord) {
          tfidfword.rating = findWord.rating;
        }
      });
    });
  }, [TFIDF]);

  useEffect(() => {
    if(data.length !== 0 && data[0].TFIDF){
      const timer = setTimeout(() => {
        setLoading(true);
        setSelectGameIdx(data.length-1);
      }, 2000);
        return () => clearTimeout(timer);
    }
  }, [addData]);

  return (
    <div>
      <Header
        setAddData={setAddData}
        data={data}
        setSelectGameIdx={setSelectGameIdx}
      ></Header>
      <Grid container style={{ height: "calc(100vh - 90px)" }} spacing={0}>
        <Grid item xs={8}>
          <Item square>
            {data.length !== 0 && data[0].TFIDF || loading ? (
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
        <Grid item xs={4}>
          <Item square>
            <div style={{ backgroundColor: "lightgray", padding: "10px" }}>
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
                    <div>
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

                  <div style={{ fontSize: "30px" }}>
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
                        {genre.description}
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
