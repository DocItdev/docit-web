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
import FilePlugin from "./plugins/FilePlugin";
import ExcalidrawPlugin from "./plugins/ExcalidrawPlugin";
import ClickableLinkPlugin from "./plugins/ClickableLinkPlugin";
import FloatingLinkEditorPlugin from "./plugins/FloatingLinkEditorPlugin";

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
  const elementRef = useRef();

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
      
      <div ref={scrollRef}>
        <AutoFocusPlugin />
        <ClearEditorPlugin />
        <ClickableLinkPlugin />
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
        <ExcalidrawPlugin />
        <ScreenshotPlugin captionsEnabled={undefined} />
        <VideoPlugin />
        <HorizontalRulePlugin />
        <FilePlugin/>
        <OnChangePlugin
          onChange={handleStateChange}
          ignoreSelectionChange={true}
        />
        {elementRef.current && (
          
          <>
            <DraggableBlockPlugin anchorElem={elementRef.current}/>
            <FloatingLinkEditorPlugin anchorElem={elementRef.current} />
          </>
        )}
        <RichTextPlugin
          contentEditable={
            <div className="editor" ref={elementRef}>
              <ContentEditable  className="TableNode__contentEditable" />
            </div>
          }
          placeholder={null}
        />
      </div>
    </>
  );
}
