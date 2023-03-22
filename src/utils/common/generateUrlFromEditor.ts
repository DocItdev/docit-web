import { LexicalEditor, RangeSelection, NodeSelection, GridSelection } from "lexical";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";

type Selection = RangeSelection | NodeSelection | GridSelection

export default function generateUrlFromEditor(editor: LexicalEditor, selection: Selection) {
  let textContent: string = selection.getTextContent();
  if (textContent) {
    textContent = !textContent.includes('https://') ? `https://${textContent}` : textContent;
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, textContent);
  } else {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
  }
}