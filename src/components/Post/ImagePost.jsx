import React from "react";
import { Box } from "@mui/material";
import useFile from "../../hooks/useFile";
import Loader from "../common/Loader";

export default function ImagePost({ filePath }) {
  const {mediaDownloadUrl, isLoading} = useFile(filePath);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box>
      <img src={mediaDownloadUrl} width="100%" height="100%"/> 
    </Box>
  );
}
