import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Typography } from '@mui/material';


export default function Post({ postData: { title, textContent } }) {
  return (
    <ListItem style={{ backgroundColor: '#fff', marginTop: '5%' }}>
      {title && (
        <Typography>{title}</Typography>
      )}
      {textContent && (
        <Typography component="h5">{textContent}</Typography>
      )}
    </ListItem>
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