import React from "react";
import { Box } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import getVar from "../../config/envConfig";
import getFileDownloadUrl from '../../utils/mediaStorage/getFileDownloadUrl';

export default function VideoPost({ filePath }) {
  const userToken = useSelector((state) => state.userToken);
  const { isLoading, data} = useQuery("storageToken", () => getFileDownloadUrl(userToken, filePath));
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
        <source
          src={data.mediaDownloadUrl}
          type="video/mp4"
        />
      </video>
    </Box>
  );
}
