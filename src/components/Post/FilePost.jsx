import React from "react";
import useFile from "../../hooks/useFile";
import { CardContent, Grid } from "@mui/material";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import Loader from "../common/Loader";

export default function FilePost({ filePath }) {
  const { mediaDownloadUrl, isLoading, Metadata } = useFile(filePath);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Grid 
      container 
      alignItems="center"
      justifyContent="center">
      <a href={mediaDownloadUrl} target="_blank" download>
        <Grid 
          item  
          direction="row" 
          align="center">
          <CardContent>
            <FilePresentIcon style={{ color: "#1F5980", fontSize: "35px" }} />
            {Metadata?.originalname}
          </CardContent>
        </Grid>
      </a>
    </Grid>
  );
}
