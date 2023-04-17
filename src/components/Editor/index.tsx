import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import Editor from "./Editor";
import DocItNodes from "./DocItNodes";
import DocItEditorTheme from "./themes/PlaygroundEditorTheme";
import { useSelector } from "react-redux";
import { RootState } from "../../config/reduxConfig";
import LeftToolbarPlugin from "./plugins/LeftToolbar";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";


export interface EditorWrapperProps {
  docData: DocumentType,
}

export default function EditorWrapper({ docData }: EditorWrapperProps) {
  const editable: boolean = useSelector((state: RootState) => state.editable);

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

      <Box >
        <CssBaseline />
        <Box style ={{}}>
          <div style={{ backgroundColor:"white", height:"50px", top:"10", padding:"20px", position:"fixed", zIndex:"4"}}>
            {editable && <ToolbarPlugin />}
          </div>
        </Box>
            
        <Box component="main" style={{minWidth:"100%"}}>
          <Toolbar />
          
          <Grid container spacing={2} >
        

            <Grid item xs={11}>
              <Editor docData={docData} />
            </Grid>

            <Grid item xs={1} >
              <div style={{ position: "fixed" }}>
                {editable && <LeftToolbarPlugin />}
              </div>
             
            </Grid>
          </Grid>

        </Box>
      </Box>

      
    </LexicalComposer>
  );
}

