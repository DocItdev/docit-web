import Box from "@mui/material/Box";
import React from "react";
import useFile from "../../hooks/useFile";
import Loader from "../common/Loader";

export default function ImagePost({ filePath }) {
  const { mediaDownloadUrl, isLoading } = useFile(filePath);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box
      style={{ alignItems: "center" }}
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <div>
        <img src={mediaDownloadUrl} style={{ maxWidth: "100%"}} />
      </div>
    </Box>
  );
}
