import "./App.css";
import Home from "./Home";
import Loading from "./component/Loading";
import NavBar from "./component/NavBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MusicCard from "./component/MusicCard";
import SearchBar from "./component/SearchBar";
import { Container } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function App() {
  const [youtube, setYoutube] = useState([]);
  const [fileToFind, setFileToFind] = useState([]);

  const data = async () => {
    await axios
      .get("http://localhost:8080/mongo/get")
      .then((data) => {
        setYoutube(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const find = async () => {
    await axios
      .get("http://localhost:8080/mongo/find?name=" + fileToFind)
      .then((data) => {
        setYoutube(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    setFileToFind(event.target.value);
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <div className="App">
      <Container maxWidth="xl">
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <NavBar />

          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search For Music"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={handleChange}
            />
            <IconButton
              onClick={find}
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          </Paper>

          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {Array.from(youtube).map((item, index) => (
                <Grid item xs={4} sm={4} md={4} key={index}>
                  <Item>
                    <MusicCard data={item} />
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </ThemeProvider>
      </Container>
    </div>
  );
}
