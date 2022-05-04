import React from "react";
import { Box, CircularProgress } from "@mui/material";
import useDownloadUrl from "../../hooks/useDownloadUrl";

export default function AudioPost({ filePath }) {
  const {mediaDownloadUrl, isLoading} = useDownloadUrl(filePath);
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
