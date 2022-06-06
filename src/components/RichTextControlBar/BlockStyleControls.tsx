import { EditorState } from "draft-js";
import StyleButton from "./StyleButton";
import draft from '../common/DocItEditor/Services';

export interface BlockStyleControlsProps {
  editorState: EditorState;
  inputType: typeof draft.BLOCK_TYPES;
  onToggle: (blockType: string) => void;
}

const BlockStyleControls = (props: BlockStyleControlsProps) => {
  const { editorState, inputType, onToggle } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
  .getCurrentContent()
  .getBlockForKey(selection.getStartKey())
  .getType();

  return (
    <div className="RichEditor-controls"
    style={{display: "inline"}}>
      {inputType.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          icon={type.icon}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default BlockStyleControls;
