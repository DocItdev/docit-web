import React from "react";
import { Box, CircularProgress } from "@mui/material";
import useDownloadUrl from "../../hooks/useDownloadUrl";

export default function VideoPost({ filePath }) {
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
      <video
        id={filePath}
        preload="metadata"
        controls
        width="60%"
        height="50%"
      >
        <source src={mediaDownloadUrl} type="video/mp4" />
      </video>
    </Box>
  );
}
