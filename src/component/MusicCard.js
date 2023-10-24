import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import axios from "axios";
import { Howl, Howler } from "howler";

import Slider from "@mui/material/Slider";

export default function MusicCard(props) {
  const theme = useTheme();
  var sound = new Howl({
    src: [
      "http://localhost:8080/download/youtube/file?filename=" +
        props.data.filePath,
    ],
    html5: true,
  });

  const toggle = () => {
    if (sound.playing()) sound.pause();
    else sound.play();
    setState({ disabled: false });
  };

  const data = async () => {
    await axios.post("http://localhost:8080/download/youtube/file", {
      filename: props.data.filePath,
    });
  };

  return (
    <div>
      <Card sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h6">
              {props.data.fileName}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {parseFloat(props.data.fileSize / 1024 / 1024).toFixed(2)} MB
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton aria-label="previous">
              {theme.direction === "rtl" ? (
                <SkipNextIcon />
              ) : (
                <a
                  href={
                    "http://localhost:8080/download/youtube/file?filename=" +
                    props.data.filePath
                  }
                >
                  <ArrowCircleDownIcon />
                </a>
              )}
            </IconButton>
            <IconButton aria-label="play/pause">
              {sound.playing() ? (
                <PauseIcon sx={{ height: 38, width: 38 }} onClick={toggle} />
              ) : (
                <PlayArrowIcon
                  sx={{ height: 38, width: 38 }}
                  onClick={toggle}
                />
              )}
            </IconButton>
            <IconButton aria-label="next">
              {theme.direction === "rtl" ? (
                <a
                  href={
                    "http://localhost:8080/download/youtube/file?filename=" +
                    props.data.filePath
                  }
                >
                  <ArrowCircleDownIcon />
                </a>
              ) : (
                <SkipNextIcon />
              )}
            </IconButton>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: "100%" }}
          image={props.data.imagePath}
          alt="Live from space album cover"
        />
      </Card>
      <Slider
        disabled
        size="small"
        defaultValue={0}
        aria-label="Small"
        valueLabelDisplay="auto"
      />
    </div>
  );
}
