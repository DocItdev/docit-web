import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import * as React from "react";
import BasicModal from "../BasicModal";
import ScreenShot from "../ScreenShot";
import ScreenRecording from "../ScreenRecording"

import { INSERT_IMAGE_COMMAND } from "./ScreenshotPlugin";
import UploadFile from "../UploadFile";


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
    <div className="toolbar">
      
      <BasicModal title="ScreenShot" component={<ScreenShot/>} />
      <BasicModal title="ScreenRecording" component={<ScreenRecording/>}/>
      <BasicModal title="UploadFile" component={<UploadFile />}/>
      <button
        onClick={() =>
          onClick({
            altText: "Pink flowers",
            src:
              "https://images.pexels.com/photos/5656637/pexels-photo-5656637.jpeg?auto=compress&cs=tinysrgb&w=200"
          })
        }
        className={"toolbar-item spaced "}
      >
        <span className="text">Insert Sample</span>
      </button>
      <button
        onClick={() =>
          onClick({
            altText: "URL image",
            src: FillURL()
          })
        }
        className={"toolbar-item spaced "}
      >
        <span className="text">Insert from URL</span>
      </button>
    </div>
  );
}
