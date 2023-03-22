import "./index.css";

import React, { useRef, useMemo, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { createEmptyHistoryState } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import YouTubePlugin from "./plugins/YouTubePlugin";
import AutoEmbedPlugin from "./plugins/AutoEmbedPlugin";
import FigmaPlugin from "./plugins/FigmaPlugin";
import HorizontalRulePlugin from "./plugins/HorizontalRulePlugin";
import ImagesPlugin from "./plugins/ImagesPlugin";
import { useSelector } from "react-redux";
import { RootState } from "../../config/reduxConfig";
import LeftToolbarPlugin from "./plugins/LeftToolbar";
import DraggableBlockPlugin from "./plugins/DraggableBlockPlugin";
import ScreenshotPlugin from "./plugins/ScreenshotPlugin";
import VideoPlugin from "./plugins/VideoPlugin";

export default function Editor() {
  const scrollRef = useRef();
  const historyState = useMemo(() => createEmptyHistoryState(), []);
  const [editor] = useLexicalComposerContext();
  const editable: boolean = useSelector((state: RootState) => state.editable);
  
  useEffect(() => {
    editor.setEditable(editable);
  }, [editable, editor]);

  useEffect(() => {
    if (editable) {
      editor.focus();
    }
  }, [editor, editable]);

  editor.registerUpdateListener(({ editorState }) => {
    console.log(editorState);
  });

  return (
    <>
    <LeftToolbarPlugin/> 
      {editable &&<ToolbarPlugin /> }
      <div ref={scrollRef}>
        <AutoFocusPlugin />
        <ClearEditorPlugin />
        <HashtagPlugin />
        <HistoryPlugin externalHistoryState={historyState} />
        <ListPlugin />
        <CheckListPlugin />
        <LinkPlugin />
        <TablePlugin />
        <AutoEmbedPlugin />
        <YouTubePlugin />
        <FigmaPlugin />
        <ImagesPlugin />
        <ScreenshotPlugin captionsEnabled={undefined}/>
        <VideoPlugin/>
        <HorizontalRulePlugin />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="TableNode__contentEditable" />
          }
          placeholder={null}
        />
      </div>
    </>
  );
}
