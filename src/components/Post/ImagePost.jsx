import React from "react";
import { Box, CircularProgress } from "@mui/material";
import useFile from "../../hooks/useFile";

export default function ImagePost({ filePath }) {
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
      <img src={mediaDownloadUrl} width="100%" height="100%"/> 
    </Box>
  );
}
