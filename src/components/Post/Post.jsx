import React from "react";
import PropTypes from "prop-types";
import { ListItem, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import TextPostBlock from "./TextPostBlock";
import styles from "./Post.module.css";
import PostMenuBar from "../PostMenuBar";
import VideoPost from "./VideoPost";
import ImagePost from "./ImagePost";
import FilePost from "./FilePost";

export default function Post({ postData }) {
  const { editable, selectedDocId, userToken } = useSelector((state) => state);
  const { postType, textContent, id, mediaFilePath } = postData;
  const editableStyle = editable ? styles.border : "";

  return (
    <Grid container className={editableStyle}>
      {editable && (
        <Grid item xs={12}>
          <PostMenuBar
            postData={postData}
            docId={selectedDocId}
            userToken={userToken}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <ListItem>
          {postType === "text" && (
            <TextPostBlock postText={textContent} postId={id} />
          )}
          {postType === "video" && <VideoPost filePath={mediaFilePath} />}
          {postType === "image" && <ImagePost filePath={mediaFilePath}/>}
          {postType === "file" && <FilePost filePath={mediaFilePath} />}

        </ListItem>
      </Grid>
    </Grid>
  );
}

Post.propTypes = {
  postData: PropTypes.shape({
    title: PropTypes.string,
    textContent: PropTypes.string,
  }),
};

Post.defaultProps = {
  postData: {
    title: "",
    textContent: "",
  },
};
