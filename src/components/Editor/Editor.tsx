import './index.css'

import React, { useRef, useMemo } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { AutoScrollPlugin } from "@lexical/react/LexicalAutoScrollPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import {createEmptyHistoryState} from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
// import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import DocItNodes from "./DocItNodes";
import DocItEditorTheme from "./themes/PlaygroundEditorTheme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import Box from '@mui/material/Box';


export default function Editor() {
  const scrollRef = useRef();
  const historyState = useMemo(() => createEmptyHistoryState(), []);

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
      <ToolbarPlugin />
      <div ref={scrollRef}>
        <AutoFocusPlugin />
        <ClearEditorPlugin />
        <HashtagPlugin />
        <HistoryPlugin externalHistoryState={historyState} />
        <AutoScrollPlugin scrollRef={scrollRef} />
        <ListPlugin />
        <CheckListPlugin />
        <LinkPlugin />
        <TablePlugin />
        <RichTextPlugin
              contentEditable={
                <Box>
                  <Box>
                    <ContentEditable />
                  </Box>
                </Box>
              }
              placeholder={null}
              // TODO Collab support until 0.4
              initialEditorState={undefined}
            />
      </div>
    </LexicalComposer>
  );
}
