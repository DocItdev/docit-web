import React, { useState, useRef } from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import { useSelector } from 'react-redux';
import createPost from "../../utils/posts/createPost";
import { useMutation, useQueryClient } from "react-query";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import draft from "./Services";
import 'draft-js/dist/Draft.css';
import './Postbar.css';
import AllStyleControlsBar from "../RichTextControlBar/RichTextControlBar";
import AsyncButton from "../common/AsyncButton";

export default function Postbar() {

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  const { userToken, selectedDocId } = useSelector(state => state);
  const queryClient = useQueryClient();
  const { isLoading, isError, error, mutate } = useMutation(
    newPost => createPost(userToken, selectedDocId, newPost), {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    }
  });

  const textInput = useRef(null);


  const handlePost = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const stringedRawContentState = JSON.stringify(rawContentState);
    mutate({
      postType: "text",
      textContent: stringedRawContentState,
      title: "",
      description: ""
    });

    onEditorStateChange(editorState.createEmpty());
  }

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
  }

  return (
    <Box>
      <Paper elevation={4} >
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
          <Grid container >
            <Grid item xs={8} >
              <div className="RichTextControlBar-Buttons" >
                <AllStyleControlsBar
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
                />
              </div>
            </Grid>
            <Grid item xs={4} >
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
    </Box>

  );
}
