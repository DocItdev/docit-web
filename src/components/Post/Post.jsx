import React, { useState } from "react";
import PropTypes from "prop-types";
import { ListItem, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import TextPost from "./TextPost";
import PostMenuBar from "../PostMenuBar";
import VideoPost from "./VideoPost";
import ImagePost from "./ImagePost";
import FilePost from "./FilePost";

import AudioPost from './AudioPost';

export default function Post({ postData }) {
  const [hover, setHover] = useState(false);
  const { editable, selectedDocId, userToken } = useSelector((state) => state);
  const { postType, textContent, id, mediaFilePath } = postData;
  
  const handleOnMouseEnter=()=>{
    setHover(true);
  }

  const handleOnMouseLeave=()=>{
    setHover(false);
  }

  return (
    <Grid 
      container 
      sx={{
        minHeight: 100,
        ...(editable && {
          '&:hover': {
            outline: '0.8pt ridge #f5f5f5'
          }
        })
      }}
      onMouseEnter={handleOnMouseEnter} 
      onMouseLeave={handleOnMouseLeave} 
    >
      
      <Grid item xs={11}>
        <ListItem>
          {postType === "text"  && <TextPost postText={textContent} postId={id} />}
          {postType === "video" && <VideoPost filePath={mediaFilePath} />}
          {postType === "image" && <ImagePost filePath={mediaFilePath}/>}
          {postType === "file"  && <FilePost filePath={mediaFilePath} />}
          {postType === "audio" && <AudioPost filePath={mediaFilePath}/>}
        </ListItem>
      </Grid>
      {editable && hover && (
        <Grid item xs={1}>
          <PostMenuBar
            postData={postData}
            docId={selectedDocId}
            userToken={userToken}
          />
        </Grid>
      )}
    </Grid>
  );
}

Post.propTypes = {
  postData: PropTypes.shape({
    title: PropTypes.string,
    textContent: PropTypes.string,
  }),
};

Post.defaultProps = {
  postData: {
    title: "",
    textContent: "",
  },
};
