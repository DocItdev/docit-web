import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '@mui/material';
import { useSelector } from 'react-redux';
import TextPostBlock from './TextPostBlock';
import styles from './Post.module.css';

export default function Post({ postData: { postType, textContent, id } }) {
  const editable = useSelector(state => state.editable);
  const editableStyle = editable ? styles.border : '';
  return (
    <>
    <ListItem className={editableStyle}>
      {postType === 'text' && (
        <TextPostBlock postText={textContent} postId={id}  />
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
