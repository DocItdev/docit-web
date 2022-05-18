import React from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import useFile from "../../hooks/useFile";


export default function AudioPost({ filePath }) {
  const { mediaDownloadUrl, isLoading } = useFile(filePath);
  if (isLoading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }
  return (

    <Grid
      container
      alignItems="center"
      justifyContent="center"
    >
      <Grid
        item
        align="center"
        justify="center">
        <audio
          id={filePath}
          preload="metadata"
          controls
        >
          <source 
            src={mediaDownloadUrl} 
            type="audio/wav" 
          />
        </audio>
      </Grid>

    </Grid>

  );
}


