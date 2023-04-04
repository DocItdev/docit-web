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
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import YouTubePlugin from "./plugins/YouTubePlugin";
import AutoEmbedPlugin from "./plugins/AutoEmbedPlugin";
import FigmaPlugin from "./plugins/FigmaPlugin";
import HorizontalRulePlugin from "./plugins/HorizontalRulePlugin";
import ImagesPlugin from "./plugins/ImagesPlugin";
import { useSelector } from "react-redux";
import { RootState } from "../../config/reduxConfig";
import updateDocument from "../../utils/documents/updateDocument";
import { useParams } from "react-router-dom";
import LeftToolbarPlugin from "./plugins/LeftToolbar";
import DraggableBlockPlugin from "./plugins/DraggableBlockPlugin";
import ScreenshotPlugin from "./plugins/ScreenshotPlugin";
import VideoPlugin from "./plugins/VideoPlugin";
import { EditorState } from "lexical";
import { DocumentType } from "../../@types/Document";
import { EMPTY_CONTENT } from "../../utils/common/constants";

export interface EditorProps {
  docData: DocumentType;
}

export default function Editor({ docData }: EditorProps) {
  const scrollRef = useRef();
  const historyState = useMemo(() => createEmptyHistoryState(), []);
  const [editor] = useLexicalComposerContext();
  const editable: boolean = useSelector((state: RootState) => state.editable);
  const userToken: string = useSelector((state: RootState) => state.userToken);
  const { docId, projectId } = useParams();

  useEffect(() => {
    if (docData?.textContent && docId === docData.id) {
      const savedEditorState = editor.parseEditorState(docData.textContent);
      editor.setEditorState(savedEditorState);
    } else {
      const emptyEditorState = editor.parseEditorState(EMPTY_CONTENT);
      editor.setEditorState(emptyEditorState);
    }
  });

  useEffect(() => {
    editor.setEditable(editable);
  }, [editable, editor]);

  useEffect(() => {
    if (editable) {
      editor.focus();
    }
  }, [editor, editable]);

  const handleStateChange = async () => {
    if (editable) {
      const editorState: EditorState = editor.getEditorState();
      const editorStateStr = JSON.stringify(editorState.toJSON());
      await updateDocument(userToken, {
        name: docData.name,
        textContent: editorStateStr,
        id: docId,
        ProjectId: projectId,
      });
    }
  };

  return (
    <>
      <LeftToolbarPlugin/> 
      {editable && <ToolbarPlugin />}
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
        <OnChangePlugin
          onChange={handleStateChange}
          ignoreSelectionChange={true}
        />
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
