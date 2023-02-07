import "./index.css";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
// import { AutoScrollPlugin } from "@lexical/react/LexicalAutoScrollPlugin";
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

export default function Editor() {
  const scrollRef = useRef();
  const historyState = useMemo(() => createEmptyHistoryState(), []);
  const [editor] = useLexicalComposerContext();
  const editable: boolean = useSelector((state: RootState) => state.editable);
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  useEffect(() => {
    editor.setEditable(editable);
  }, [editable, editor]);

  useEffect(() => {
    if (editable) {
      editor.focus();
    }
  }, [editor, editable]);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

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
        <HorizontalRulePlugin />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="TableNode__contentEditable" />
          }
          placeholder={null}
        />
        {/* {floatingAnchorElem && (
            <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
        )} */}
      </div>
    </>
  );
}
