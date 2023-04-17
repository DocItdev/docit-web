import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import * as React from "react";
import BasicModal from "../BasicModal";
import ScreenShot from "../ScreenShot";
import ScreenRecording from "../ScreenRecording"

import { INSERT_IMAGE_COMMAND } from "./ScreenshotPlugin";
import UploadFile from "../UploadFile";
import ScreenshotMonitorIcon from '@mui/icons-material/ScreenshotMonitor';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Button } from "@mui/material";


// const ICONS = {
//   "ScreenShot": <ScreenshotMonitorIcon/>,
//   "ScreenRecording":<VideoCameraBackIcon/>,
//   "UploadFile":<UploadFileIcon/>,

// }

export function FillURL() {
  const srcfile = prompt("Enter the URL of the image:", "");

  return srcfile;
}

export default function LeftToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const onClick = (payload) => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
  };

  return (
    <div className="">
      
      <BasicModal title="ScreenShot" icon={ <ScreenshotMonitorIcon/>} component={<ScreenShot/>} />
      <BasicModal title="ScreenRecording" icon={<VideoCameraBackIcon/>} component={<ScreenRecording/>}/>
      <BasicModal title="UploadFile" icon={<UploadFileIcon/>} component={<UploadFile />}/>
      <Button
        onClick={() =>
          onClick({
            altText: "Pink flowers",
            src:
              "https://images.pexels.com/photos/5656637/pexels-photo-5656637.jpeg?auto=compress&cs=tinysrgb&w=200"
          })
        }
      >
        S
      </Button>
      <br/> 
      <Button
        onClick={() =>
          onClick({
            altText: "URL image",
            src: FillURL()
          })
        }
        
      >
        URL
      </Button>
    </div>
  );
}
