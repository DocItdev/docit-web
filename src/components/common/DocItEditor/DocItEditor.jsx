import React, { useState, useRef } from "react";
import {
  Editor,
  EditorState,
  ContentState,
  RichUtils,
  convertToRaw,
} from "draft-js";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";

import draft from "./Services";
import "draft-js/dist/Draft.css";
import "./DocItEditor.css";
import AllStyleControlsBar from "../../RichTextControlBar";
import AsyncButton from "../AsyncButton";
import { Button } from "@mui/material";

export default function DocItEditor({
  blocks,
  onMutate,
  readOnly,
  buttonText,
  alwaysFocused,
  onSuccess,
}) {
  const [editorState, setEditorState] = useState(() =>
    blocks ? EditorState.createWithContent(blocks) : EditorState.createEmpty()
  );
  const textInput = useRef(null);
  const [focused, setFocused] = useState(alwaysFocused);
  const queryClient = useQueryClient();
  const { isLoading, isError, error, mutate } = useMutation(onMutate, {
    onSuccess: () => {
      onSuccess();
      if (!alwaysFocused) {
        setFocused(false);
      }
      queryClient.invalidateQueries('posts');
    }
  })

  const focus = () => {
    textInput.current.focus();
  };

  const toggleFocused = (value) => {
    if (!alwaysFocused) {
      setFocused(value);
    }
  };

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

  const handleClick = () => {
    if(!readOnly) {
      toggleFocused(true)
    }
  }

  //Finish blockquote
  return (
    <Grid container>
      <Grid item xs={12} onClick={handleClick} className="RichTextEditor">
        <Editor
          customStyleMap={draft.styleMap}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          ref={textInput}
          blockStyleFn={draft.getBlockStyle}
          spellCheck={true}
          readOnly={readOnly}
        />
      </Grid>
      {!readOnly && focused && (
        <Grid container onClick={focus} className="RichTextControlBar">
          <Grid item xs={blocks && focused ? 10 : 8}>
            <div className="RichTextControlBar-Buttons">
              <AllStyleControlsBar
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            </div>
          </Grid>
          {blocks && focused && (
            <Grid item xs={1}>
              <Button onClick={() => toggleFocused(false)}>Cancel</Button>
            </Grid>
          )}
          <Grid item xs={blocks && focused ? 1 : 4}>
            <div className="RichTextControlBar-PostButton">
              <AsyncButton
                loading={isLoading}
                error={isError ? error : ""}
                onClick={handlePost}
              >
                {buttonText}
              </AsyncButton>
            </div>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

DocItEditor.propTypes = {
  blocks: PropTypes.instanceOf(ContentState),
  onMutate: PropTypes.func,
  onSuccess: PropTypes.func,
  readOnly: PropTypes.bool,
  buttonText: PropTypes.string,
  alwaysFocused: PropTypes.bool,
};

DocItEditor.defaultProps = {
  blocks: null,
  onMutate: () => {},
  onSuccess: () => {},
  readOnly: false,
  alwaysFocused: false,
  buttonText: "POST",
  buttonProps: {
    isLoading: false,
    isError: false,
    error: "",
  },
};