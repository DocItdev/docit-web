import React from "react";
import { Box, CircularProgress } from "@mui/material";
import useFile from "../../hooks/useFile";

export default function AudioPost({ filePath }) {
  const {mediaDownloadUrl, isLoading} = useFile(filePath);
  if (isLoading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box>
      <audio
        id={filePath}
        preload="metadata"
        controls
      >
        <source src={mediaDownloadUrl} type="audio/wav" />
      </audio>
    </Box>
  );
}
