import { useState } from "react";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import TextPost from "./TextPost";
import PostMenuBar from "../PostMenuBar";
import VideoPost from "./VideoPost";
import ImagePost from "./ImagePost";
import FilePost from "./FilePost";

import AudioPost from './AudioPost';
import { RootState } from "../../config/reduxConfig";

export interface PostProps {
  postData: {
    id: string;
    postType: string;
    title: string;
    description: string;
    textContent: string;
    mediaFilePath: string;
  };
}

export default function Post({ postData }: PostProps) {
  const [hover, setHover] = useState<boolean>(false);
  const { editable, selectedDocId, userToken } = useSelector((state: RootState) => state);
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

Post.defaultProps = {
  postData: {
    title: "",
    textContent: "",
  },
};
