import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '@mui/material';
import { useSelector } from 'react-redux';
import TextPostBlock from './TextPostBlock';
import styles from './Post.module.css';
import PostMenuBar from '../PostMenuBar/PostMenuBar';

export default function Post({ postData: { postType, textContent, id } }) {
  const {editable, selectedDocId, userToken} = useSelector(state => state);
  const editableStyle = editable ? styles.border : '';
  return (
    <>
    { editable && <PostMenuBar postId={id} docId={selectedDocId} userToken={userToken}  /> }
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
