import StyleButton from "./StyleButton";
import draft from '../common/DocItEditor/Services';
import { EditorState } from "draft-js";
import React from "react";

export interface InlineStyleControlsProps {
  editorState: EditorState;
  inputType: typeof draft.INLINE_TYPES;
  onToggle: (blockType: string) => void;
}

const InlineStyleControls = (props: InlineStyleControlsProps) => {
  const { editorState, inputType, onToggle } = props;
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls" style={{display: "inline"}}>
      {inputType.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          icon={type.icon}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default InlineStyleControls;
