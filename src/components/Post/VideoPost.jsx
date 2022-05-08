import React from "react";
import { Box, CircularProgress } from "@mui/material";
import useFile from "../../hooks/useFile";
import Loader from "../common/Loader";

export default function VideoPost({ filePath }) {
  const {mediaDownloadUrl, isLoading} = useFile(filePath);
  if (isLoading) {
    return <Loader />;
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
