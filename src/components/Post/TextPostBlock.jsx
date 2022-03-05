import React, { useState, useMemo } from 'react';
import { Paper } from '@mui/material';
import { EditorState, convertFromRaw, Editor } from 'draft-js';

export default function TextPostBlock({ post }) {
  const blocks = useMemo(() => convertFromRaw(JSON.parse(post)),[post]);
  const [editorState, setEditorState] = 
    useState(EditorState.createWithContent(blocks));
  const [focused, setFocused] = useState(false);

  const handleChange = (editorState) => {
    setEditorState(editorState);
    setFocused(editorState.getSelection().getHasFocus());
  }

  return (
      <Editor
        editorState={editorState}
        onChange={handleChange}
        readOnly={true}
      />
  )
}
