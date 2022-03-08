import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ListItem, Typography, Paper } from '@mui/material';
import TextPostBlock from './TextPostBlock';
import styles from './Post.module.css';
import PostMenuBar from '../PostMenuBar/PostMenuBar';

export default function Post({ postData: { title, textContent } }) {
  return (
    <>
    {/* <PostMenuBar /> */}
    <ListItem className={styles.root}>
      {title && (
        <Typography>{title}</Typography>
      )}
      {textContent && (
        <TextPostBlock post={textContent} />
      )}
    </ListItem>
    </>
  );
}

Post.propTypes = {
  postData: PropTypes.shape({
    title: PropTypes.string,
    textContent: PropTypes.string,
  })
}

Post.defaultProps = {
  postData: {
    title: '',
    textContent: '',
  }
}
