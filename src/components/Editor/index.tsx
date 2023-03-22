import React from 'react';
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import Editor from './Editor';
import DocItNodes from "./DocItNodes";
import DocItEditorTheme from "./themes/PlaygroundEditorTheme";

export interface EditorWrapperProps {
   docData: DocumentType,
}

export default function EditorWrapper({ docData }: EditorWrapperProps) {
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
      <Editor docData={docData} />
    </LexicalComposer>
  )
}

