import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import styles from './PostMenuBar.module.css';
import { useMutation, useQueryClient } from 'react-query';
import deletePost from '../../utils/posts/deletePost';

export default function PostMenuBar({ userToken, docId, postId }) {
  const queryClient = useQueryClient();
  const {mutate} = useMutation(() => deletePost(userToken, docId, postId), {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    }
  })
  return (
    <Box className={styles.container}>
        <IconButton onClick={() => mutate()} className={styles.iconButton}>
          <Delete fontSize='small' />
        </IconButton>
    </Box>
  )
}