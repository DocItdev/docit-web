import React from "react";
import StyleButton from "./StyleButton";

const InlineStyleControls = (props) => {
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
