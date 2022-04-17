import React from "react";
import { Box, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import styles from "./PostMenuBar.module.css";
import { useMutation, useQueryClient } from "react-query";
import deletePost from "../../utils/posts/deletePost";
import updatePostIndex from "../../utils/posts/updatePostIndex";
import createPostOrderObject from "../../utils/posts/createPostOrderObject";

export default function PostMenuBar({ userToken, docId, postData }) {
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

  const handleClick = (event) => {
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
  return (
    <Box className={styles.container}>
      <IconButton onClick={handleClick} className={styles.iconButton}>
        <Delete fontSize="small" />
      </IconButton>
    </Box>
  );
}
