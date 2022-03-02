import React, {useState} from "react";
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';
import { useSelector } from 'react-redux';
import createPost from "../../utils/posts/createPost";
import { useMutation, useQueryClient } from "react-query";
import 'draft-js/dist/Draft.css';
import './Postbar.css';


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
    
  }

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand( editorState, command );
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  return (
    <div >
          <div className="postbarEditorContainer">
            testing
            <div className="editors">
              <Editor editorState={editorState} onChange={setEditorState} handleKeyCommand={handleKeyCommand}/>
            </div>
            <div>
              <button className="bold" onClick={onBoldClick} >
                <b>B</b>
              </button>
              <button
                onClick={ handlePost}
              >
                POST
              </button>
            </div>
          </div>
        </div>
  
  );
}
