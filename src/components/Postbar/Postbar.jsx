import React, {useState} from "react";
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';
import IconButton from '@mui/material/IconButton';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import Button from '@mui/material/Button';
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
                B
              </button>
              <IconButton onClick={onBoldClick} color="primary" aria-label="upload picture" component="span">
                <FormatBoldIcon color="" />
              </IconButton>

              <Button > 
                <FormatBoldIcon />
              </Button>
              
              
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
