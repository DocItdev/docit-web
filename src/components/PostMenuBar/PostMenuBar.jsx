import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { Delete, DragIndicator } from "@mui/icons-material";
import styles from "./PostMenuBar.module.css";
import { useMutation, useQueryClient } from "react-query";
import deletePost from "../../utils/posts/deletePost";
import updatePostIndex from "../../utils/posts/updatePostIndex";
import createPostOrderObject from "../../utils/posts/createPostOrderObject";
import Grid from '@mui/material/Grid';

export default function PostMenuBar({ userToken, docId, postData }) {
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
  const { mutate: triggerPostIndexUpdate } = useMutation(
    (postIndexes) => updatePostIndex(userToken, docId, postIndexes),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
    }
  );
  const { id: postId } = postData;

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    const postData = queryClient.getQueryData("posts");
    const newPostData = postData.filter((post) => post.id !== postId);
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
    <Box 
       
      className={styles.container}
    >
      <Grid xs={12} item>
        <IconButton 
          onClick={handleDeleteClick} 
          style={{background:"none"}} 
          className={styles.iconButton}
        >
          <Delete 
            onMouseEnter={handleOnMouseEnter} 
            onMouseLeave={handleOnMouseLeave}
            color={hover ? "error" : "disabled"} 
            fontSize="small" />
        </IconButton>
      </Grid>
      <Grid xs={12} style={{marginTop:"5%"}} item >
        <IconButton 
          className={styles.iconButton} 
          style={{background:"none"}}
        >
          <DragIndicator 
            sx={{ border: 0, boxShadow: 0, }} 
            color="info" 
            fontSize="large" 
          />
        </IconButton>
      </Grid>
    </Box>
  );
}
