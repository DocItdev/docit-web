import React from "react";
import { Box } from "@mui/material";
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
        width="100%"
        height="100%"
      >
        <source src={mediaDownloadUrl} type="video/mp4" />
      </video>
    </Box>
  );
}
