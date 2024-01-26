import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import SearchIcon from "@mui/icons-material/Search";
// import FetchData from "./FetchData";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FetchSearchTermTGameId from "./FetchSearchTermTGameId";
import { useState, useEffect } from "react";
import jsonData from "./../../gameidData.json";
import { Button } from "@mui/material";

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
  const { addData, setAddData, data, setSelectGameIdx } = props;
  const [addGameId, setAddGameId] = useState(0);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(false);

  const setSearchTermTGameId = (tar) => {
    setSearchTerm(tar);
    if (tar.length > 2)
      FetchSearchTermTGameId({ tar, setAddGameId, setSearchSuggestions });
    //    setAddData(tar);
  };

  // const setSearchTermFunc = (tar) => {
  //   setSearchTerm(tar);
  //   if(tar.length > 5)
  //       FetchSearchTermTGameId({ tar, setAddGameId, setSearchSuggestions  });
  // };

  // const handleSearch = () => {
  //   console.log(searchTerm);
  //   FetchSearchTermTGameId({ searchTerm, setAddGameId, setSearchSuggestions  });
  // };

  const handleSuggestionClick = (suggestion) => {
    setSearchTermTGameId(suggestion);
    setSearchTerm("");

    /* 完全一致自動検索 */
    // const selectedApp = jsonData.applist.apps.find((app) => app.name === suggestion);
    // if (selectedApp) {
    //   setAddData(selectedApp.appid);
    // }
  };

  useEffect(() => {
    //確認用
    console.log(data);
  }, [data]);

  useEffect(() => {
    setAddData(addGameId);
  }, [addGameId]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
            <MenuIcon onClick={toggleMenu} />
            {menuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  backgroundColor: "#000",
                  fontSize: "16px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  borderRadius: "4px",
                  padding: "8px",
                  zIndex: "1",
                  maxHeight: "90vh",
                  overflowY: "auto",
                }}
              >
                <ul>
                  {addData &&
                    data.slice(-1).map((game, index) => (
                      <li
                        style={{ padding: "10px" }}
                        key={index}
                        onClick={() => {
                          setSelectGameIdx(index);
                          setMenuOpen(false);
                        }}
                      >
                        <span
                          style={{
                            color: `rgba(255, 150, ${
                              255 / data.length + index * (255 / data.length)
                            })`,
                          }}
                        >
                          検索中. &nbsp;
                        </span>
                        {game.name}
                      </li>
                    ))}
                  {data.map((game, index) => (
                    <li
                      style={{ padding: "10px" }}
                      key={index}
                      onClick={() => {
                        setSelectGameIdx(index);
                        setMenuOpen(false);
                      }}
                    >
                      <span
                        style={{
                          color: `rgba(255, 150, ${
                            255 / data.length + index * (255 / data.length)
                          })`,
                        }}
                      >
                        {index + 1}. &nbsp;
                      </span>
                      {game.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
              // onChange={(e) => setSearchTermFunc(e.target.value)}
              onChange={(e) => setSearchTermTGameId(e.target.value)}
            />
            {searchSuggestions.length > 1 &&
              searchTerm &&
              searchTerm !== "" && (
                <Paper
                  sx={{
                    position: "absolute",
                    zIndex: 1,
                    left: 0,
                    right: 0,
                    mt: 1,
                  }}
                >
                  <List>
                    {searchSuggestions.slice(0, 5).map((suggestion) => (
                      <ListItem
                        button
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <ListItemText primary={suggestion} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            {/* <Button onClick={() => handleSearch()}>検索</Button> */}
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
