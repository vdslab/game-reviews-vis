import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import Header from "./components/Header";
import Icon from "./components/Icon";

const App = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    height: "100%",
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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
          <Item square></Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
