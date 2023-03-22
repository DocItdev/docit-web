import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand
} from "lexical";
import { useEffect } from "react";

import { $createVideoNode } from "../nodes/VideoNode";
export const INSERT_VIDEO_COMMAND =
  createCommand('INSERT_VIDEO_COMMAND');

export default function VideoPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Similar with command listener, which returns unlisten callback
    const removeListener = editor.registerCommand(
      INSERT_VIDEO_COMMAND,
      (payload) => {
        // Adding custom command that will be handled by this plugin
        editor.update(() => {
          $insertNodes([$createVideoNode(payload)]);
        });

        // Returning true indicates that command is handled and no further propagation is required
        return true;
      },
      0,
    );

    return () => {
      removeListener();
    };
  }, [editor]);

  return null;
}