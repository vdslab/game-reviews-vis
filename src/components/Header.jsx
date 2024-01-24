import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
// import FetchData from "./FetchData";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FetchSearchTermTGameId from "./FetchSearchTermTGameId";
import { useState, useEffect } from "react";
import jsonData from "./../../gameidData.json";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar(props) {
  const { setAddData, setSelectGameIdx } = props;
  const [addGameId, setAddGameId] = useState(0);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  

  const setSearchTermTGameId = (tar) => {
    if(tar.length > 10)
      FetchSearchTermTGameId({ tar, setAddGameId, setSearchSuggestions  });
    //    setAddData(tar);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTermTGameId(suggestion);
    const selectedApp = jsonData.applist.apps.find((app) => app.name === suggestion);
    if (selectedApp) {
      setAddData(selectedApp.appid);
    }
    setSearchSuggestions([]); // カーソルを外す
  };

  useEffect(() => {
    setAddData(addGameId);
  }, [addGameId]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Steamゲームレビュー可視化
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setSearchTermTGameId(e.target.value)}            />
              {searchSuggestions.length > 1 && (
                <Paper sx={{ position: 'absolute', zIndex: 1, left: 0, right: 0, mt: 1 }}>
                  <List>
                    {searchSuggestions.slice(0, 3).map((suggestion) => (
                      <ListItem button key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
                        <ListItemText primary={suggestion} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
