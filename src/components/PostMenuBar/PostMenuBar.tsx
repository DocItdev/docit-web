import React, { SyntheticEvent, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { Delete, DragIndicator } from "@mui/icons-material";
import "./PostMenuBar.css";
import { useMutation, useQueryClient } from "react-query";
import deletePost from "../../utils/posts/deletePost";
import updatePostIndex from "../../utils/posts/updatePostIndex";
import createPostOrderObject from "../../utils/posts/createPostOrderObject";
import Grid from '@mui/material/Grid';
import { PostType, PostIndex } from "../../@types/Post";
import { AxiosError } from "axios";

export interface PostMenuBarProps {
  userToken: string;
  docId: string;
  postData: PostType;
}

export default function PostMenuBar({ userToken, docId, postData }: PostMenuBarProps) {
  const [hover, setHover] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: triggerPostDelete } = useMutation(
    () => deletePost(userToken, docId, postData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
    }
  );
  const { mutate: triggerPostIndexUpdate } = useMutation<
    any,
    AxiosError,
    PostIndex[],
    void
  >(
    (postIndexes) => updatePostIndex(userToken, docId, postIndexes),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
    }
  );
  const { id: postId } = postData;

  const handleDeleteClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    const posts: PostType[] = queryClient.getQueryData("posts");
    const newPostData = posts.filter((post) => post.id !== postId);
    const postIndexes = createPostOrderObject(
      newPostData,
      0,
      newPostData.length - 1
    );
    triggerPostIndexUpdate(postIndexes);
    triggerPostDelete();
  };

  const handleOnMouseEnter = () => {
    setHover(true);
  }
  const handleOnMouseLeave = () => {
    setHover(false);
  }

  return (
    <Grid 
      container
      className="postmenubar-container"
    >
      <Grid xs={12} item>
        <IconButton 
          style={{background:"none"}} 
          className="postmenubar-iconButton"
        >
          <DragIndicator
            sx={{ border: 0, boxShadow: 0, }}
            color="info"
            fontSize="large"
          />
        </IconButton>
      </Grid>
      <Grid xs={12} style={{marginTop:"5%"}} item >
        <IconButton
          onClick={handleDeleteClick} 
          className="postmenubar-iconButton"
          style={{background:"none"}}
        >
          <Delete
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            color={hover ? "error" : "disabled"}
            fontSize="small" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
