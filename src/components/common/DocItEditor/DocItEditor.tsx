import React, { useState, useRef } from 'react';
import {
  Editor,
  EditorState,
  ContentState,
  RichUtils,
  convertToRaw,
  EditorCommand,
} from 'draft-js';
import { AxiosError } from 'axios';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useMutation, useQueryClient } from 'react-query';

import SendIcon from '@mui/icons-material/Send';
import draft from './Services';
import 'draft-js/dist/Draft.css';
import './DocItEditor.css';
import AllStyleControlsBar from '../../RichTextControlBar';
import AsyncButton from '../AsyncButton';

export interface Post {
  postType: string;
  textContent: string;
  title: string;
  description: string;
  index: number;
}

export interface EditorProps {
  blocks?: ContentState;
  onMutate?: () => Promise<void>;
  onSuccess?: () => Promise<void>;
  buttonText?: string;
  alwaysFocused?: boolean;
  readOnly?: boolean;
}

export default function DocItEditor({
  blocks,
  onMutate,
  readOnly,
  buttonText,
  alwaysFocused,
  onSuccess,
}: EditorProps) {
  const [editorState, setEditorState] = useState<EditorState>(
    () => (blocks ? EditorState.createWithContent(blocks) : EditorState.createEmpty()),
  );
  const textInput = useRef(null);
  const [focused, setFocused] = useState<boolean>(alwaysFocused);
  const queryClient = useQueryClient();
  const {
    isLoading, isError, error, mutate,
  } = useMutation<
    void,
    AxiosError,
    Post,
    void
  >(onMutate, {
    onSuccess: () => {
      onSuccess();
      if (!alwaysFocused) {
        setFocused(false);
      }
      if (!blocks) {
        const newEditorState = EditorState.push(
          editorState,
          ContentState.createFromText(''),
          'undo',
        );
        setEditorState(newEditorState);
      }
      queryClient.invalidateQueries('posts');
    },
  });

  const focus = () => {
    textInput.current.focus();
  };

  const toggleFocused = (value: boolean) => {
    if (!alwaysFocused) {
      setFocused(value);
    }
  };

  const handlePost = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const jsonContent = JSON.stringify(rawContentState);
    const postData = queryClient.getQueryData('posts') as any[];
    mutate({
      postType: 'text',
      textContent: jsonContent,
      title: '',
      description: '',
      index: postData?.length,
    });
  };

  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  const handleKeyCommand = (command: EditorCommand) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const handleClick = () => {
    if (!readOnly) {
      toggleFocused(true);
    }
  };

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
          spellCheck
          readOnly={readOnly}
        />
      </Grid>

      {!readOnly && focused && (
        <Grid container onClick={focus} className="RichTextControlBar">
          <Grid item xs={blocks && focused ? 9 : 8}>
            <div className="RichTextControlBar-Buttons">
              <AllStyleControlsBar
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            </div>
          </Grid>
          {blocks && focused && (
            <Grid item xs={2}>
              <Button onClick={() => toggleFocused(false)}>Cancel</Button>
            </Grid>
          )}
          <Grid item xs={blocks && focused ? 1 : 4}>
            <div className="RichTextControlBar-PostButton">
              <AsyncButton
                loading={isLoading}
                error={isError ? error.message : ''}
                onClick={handlePost}
                startIcon={blocks && focused? "": <SendIcon/>}
                color="primary"
                variant="contained"
              >
                <Typography variant="inherit">{buttonText}</Typography>
              </AsyncButton>
            </div>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

DocItEditor.defaultProps = {
  blocks: null,
  onMutate: () => {},
  onSuccess: () => {},
  readOnly: false,
  alwaysFocused: false,
  buttonText: 'POST',
};
