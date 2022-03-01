import React from "react";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './Postbar.css';


export default function Postbar() {
    
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );
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
        <h1 >Postbar</h1>
        
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
                onClick={() => {
                  alert("testing post");
                }}
              >
                POST
              </button>
            </div>
          </div>
        </div>
  
  );
}
