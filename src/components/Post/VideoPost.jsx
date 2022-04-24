import React from "react";
import { Box } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import getFileDownloadUrl from "../../utils/mediaStorage/getFileDownloadUrl";

export default function VideoPost({ filePath }) {
  const userToken = useSelector((state) => state.userToken);
  const { isLoading, data } = useQuery("storageToken", () =>
    getFileDownloadUrl(userToken, filePath)
  );
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
        <source src={data.mediaDownloadUrl} type="video/mp4" />
      </video>
    </Box>
  );
}
