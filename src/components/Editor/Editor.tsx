import './index.css'

import React, { useRef, useMemo, useEffect } from "react";
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
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
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { RootState } from '../../config/reduxConfig';


export default function Editor() {
  const scrollRef = useRef();
  const historyState = useMemo(() => createEmptyHistoryState(), []);
  const [editor] = useLexicalComposerContext();
  const editable: boolean = useSelector((state: RootState) => state.editable);
  
  useEffect(() => {
    editor.setEditable(editable);
  }, [editable, editor])

  useEffect(() => {
    if(editable) {
      editor.focus();
    }
  }, [editor, editable])

  return (
    <>
      {editable && <ToolbarPlugin />}
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
                    <ContentEditable
                      className="TableNode__contentEditable"
                    />
                  </Box>
                </Box>
              }
              placeholder={null}
              // TODO Collab support until 0.4
              initialEditorState={undefined}
            />
      </div>
    </>
  );
}
