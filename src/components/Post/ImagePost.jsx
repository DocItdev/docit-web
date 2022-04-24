import React from "react";
import { Box, CircularProgress } from "@mui/material";
import useDownloadUrl from "../../hooks/useDownloadUrl";

export default function ImagePost({ filePath }) {
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
      <img src={mediaDownloadUrl} width="100%" height="100%"/> 
    </Box>
  );
}
