import React from 'react';
import { Card, CardActions, IconButton } from '@mui/material';
import { Delete, ModeEdit } from '@mui/icons-material';
import styles from './PostMenuBar.module.css';

export default function PostMenuBar({ className }) {
  return (
    <Card className={styles.container}>
      <CardActions disableSpacing className={styles.actions}>
        <IconButton className={styles.iconButton} >
         <ModeEdit fontSize='small' />
        </IconButton>
        <IconButton className={styles.iconButton}>
          <Delete fontSize='small' />
        </IconButton>
      </CardActions>
    </Card>
  )
}