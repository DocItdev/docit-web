import React, { useState, useRef } from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import { useSelector } from 'react-redux';
import createPost from "../../utils/posts/createPost";
import { useMutation, useQueryClient } from "react-query";
import draft from "./Services";
import 'draft-js/dist/Draft.css';
import './Postbar.css';
import AllStyleControlsBar from "../RichTextControlBar/RichTextControlBar";
import AsyncButton from "../common/AsyncButton";

export default function Postbar() {

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  const { userToken, selectedDocId } = useSelector(state => state);
  const queryClient = useQueryClient();
  const { isLoading, isError, error, mutate } = useMutation(
    newPost => createPost(userToken, selectedDocId, newPost), {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    }
  });

  const textInput = useRef(null);


  const handlePost = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const stringedRawContentState = JSON.stringify(rawContentState);
    mutate({
      postType: "text",
      textContent: stringedRawContentState,
      title: "",
      description: ""
    });

    onEditorStateChange( editorState.createEmpty());
  }

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };


  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  //Finish blockquote
  function getBlockStyle(block) {
    switch (block.getType()) {
      case "blockquote":
        return "blockquote";
      case "code-block":
        return "code-block";
      default:
        return null;
    }
  }

  const focus = () => {
    textInput.current.focus();
  }

  return (
    <div>
      <div className="postbarEditorContainer" >
        <Editor
          customStyleMap={draft.styleMap}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          ref={textInput}
          blockStyleFn={getBlockStyle}
        />

        <div onClick={focus} >
          <AllStyleControlsBar

            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
          />
          <AsyncButton loading={isLoading} error={isError ? error : ""} onClick={handlePost} style={{ float: "right" }} >POST</AsyncButton>
        </div>
      </div>
    </div>

  );
}
