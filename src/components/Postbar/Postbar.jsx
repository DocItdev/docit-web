import React from "react";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import createPost from "../../utils/posts/createPost";
import DocItEditor from "../common/DocItEditor/DocItEditor";

export default function PostBar() {
  const { userToken, selectedDocId } = useSelector((state) => state);

  return (
    <Paper elevation={4}>
      <DocItEditor
        onMutate={(newPost) => createPost(userToken, selectedDocId, newPost)}
        alwaysFocused={true}
      />
    </Paper>
  );
}
