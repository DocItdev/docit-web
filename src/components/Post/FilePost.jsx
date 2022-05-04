import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import useFile from "../../hooks/useFile";
import {
    IconButton,

    Card,
    CardActions,
    CardContent,
    Grid,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import FilePresentIcon from '@mui/icons-material/FilePresent';

export default function FilePost({ filePath }) {
    const [file, setFile] = useState();
    const [url, setUrl] = useState();
    const {mediaDownloadUrl, isLoading, Metadata} = useFile(filePath);

console.log(Metadata);
  return (
    <Box> 
      { mediaDownloadUrl ? (
           <Grid container>
               <a href={mediaDownloadUrl} target="_blank" download>
           <Grid item justify="center" direction="row" align="center">
               <CardContent style={{border:"solid 3px #1F5980", borderRadius: "3px"}}>
                   <FilePresentIcon style={{ color: "#1F5980", fontSize: "100px" }} />
                   Download File
               </CardContent>
           </Grid>
           </a>
           </Grid>
         
      ) : <CircularProgress/>}
    </Box>
  );
}