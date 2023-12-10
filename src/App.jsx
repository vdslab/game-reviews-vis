import Grid from "@material-ui/core/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import WordCloud from "react-d3-cloud";
import { useState, useEffect } from "react";

import Header from "./components/Header";
import Icon from "./components/Icon";
import Wordcloud from "./components/Wordcloud";

const App = () => {
  const [wordsData, setWordsData] = useState(null);
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

  useEffect(() => {
    Wordcloud(setWordsData);
  }, []);

  return (
    <div>
      <Header></Header>
      <Grid container style={{ height: "calc(100vh - 90px)" }} spacing={0}>
        <Grid item xs={8}>
          <Item square>
            <Icon></Icon>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item square>
            {wordsData ? (
              <WordCloud
                data={wordsData.data}
                fontSize={fontSizeMapper}
                width={100}
                height={100}
                rotate={0}
              ></WordCloud>
            ) : (
              <h2>Loading...</h2>
            )}
          </Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
