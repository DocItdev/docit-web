import React from 'react';
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import Editor from './Editor';
import DocItNodes from "./DocItNodes";
import DocItEditorTheme from "./themes/PlaygroundEditorTheme";


export default function EditorWrapper() {
  const initialConfig = {
    editorState: null,
    namespace: "DocIt",
    theme: DocItEditorTheme,
    nodes: DocItNodes,
    onError: (error: Error) => {
      throw error;
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Editor />
    </LexicalComposer>
  )
}

