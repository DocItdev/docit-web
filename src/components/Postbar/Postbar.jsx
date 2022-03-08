import React, { useState, useRef } from "react";
import { Editor, EditorState, ContentState, RichUtils, convertToRaw } from "draft-js";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import draft from "./Services";
import "draft-js/dist/Draft.css";
import "./Postbar.css";
import createPost from "../../utils/posts/createPost";
import AllStyleControlsBar from "../RichTextControlBar/RichTextControlBar";
import AsyncButton from "../common/AsyncButton";

export default function Postbar() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const { userToken, selectedDocId } = useSelector((state) => state);
  const queryClient = useQueryClient();
  const { isLoading, isError, error, mutate } = useMutation(
    (newPost) => createPost(userToken, selectedDocId, newPost),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
    }
  );

  const textInput = useRef(null);

  const handlePost = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const jsonContent = JSON.stringify(rawContentState);
    mutate({
      postType: "text",
      textContent: jsonContent,
      title: "",
      description: "",
    });
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  //Finish blockquote

  const focus = () => {
    textInput.current.focus();
  };

  return (
    <Paper elevation={4}>
      <div className="RichTextEditor">
        <Editor
          customStyleMap={draft.styleMap}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          ref={textInput}
          blockStyleFn={draft.getBlockStyle}
          spellCheck={true}
        />
      </div>
      <div onClick={focus} className="RichTextControlBar">
        <Grid container>
          <Grid item xs={8}>
            <div className="RichTextControlBar-Buttons">
              <AllStyleControlsBar
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="RichTextControlBar-PostButton">
              <AsyncButton
                loading={isLoading}
                error={isError ? error : ""}
                onClick={handlePost}
              >
                POST
              </AsyncButton>
            </div>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}
