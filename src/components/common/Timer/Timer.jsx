import React from "react";
import { Box, Typography } from "@mui/material";

const Timer = ({ hours, minutes, seconds }) => (
  <Box component="span">
    {hours > 0 && (
      <Typography component="span">
        {hours < 10 ? hours.toString().padStart(2, "0") : hours}:
      </Typography>
    )}
    <Typography component="span">
      {minutes < 10 ? minutes.toString().padStart(2, "0") : minutes}:
    </Typography>
    <Typography component="span">
      {seconds < 10 ? seconds.toString().padStart(2, "0") : seconds}
    </Typography>
  </Box>
);

export default Timer;
