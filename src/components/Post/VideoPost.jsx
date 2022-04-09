import { Box } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import fetchMediaFile from "../../utils/mediaStorage/fetchMediaFile";

export default function VideoPost({ filePath }) {
  const userToken = useSelector((state) => state.userToken);
  const { isLoading, error, data } = useQuery("mediaBlob", () =>
    fetchMediaFile(userToken, filePath)
  );
  if (isLoading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <Box>
      <video controls width="100%" height="100%">
        <source src={data?.mediaBlobUrl} type="video/mp4" />
      </video>
    </Box>
  );
}
