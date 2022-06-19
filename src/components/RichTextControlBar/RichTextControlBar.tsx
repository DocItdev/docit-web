import { EditorState, RichUtils } from "draft-js";
import InlineStyleControls from "./InlineStyleControls";
import draft from "../common/DocItEditor/Services";
import BlockStyleControls from "./BlockStyleControls";
import React from "react";

export interface RichTextControlBarProps {
    editorState: EditorState;
    onEditorStateChange: (newEditorState: EditorState) => void;
}

const RichTextControlBar = (props: RichTextControlBarProps) => {
    const { editorState, onEditorStateChange } = props;

    const toggleInlineStyle = (inlineStyle: string) => {
        onEditorStateChange( RichUtils.toggleInlineStyle(editorState, inlineStyle) )
        
    };
    const toggleBlockStyle = (blockStyle: string) => {
        onEditorStateChange( RichUtils.toggleBlockType(editorState, blockStyle) )
    };

    const INLINE_TYPES = draft.INLINE_TYPES || [];
    const BLOCK_TYPES = draft.BLOCK_TYPES || [];
    return (
    <div >
        <InlineStyleControls
            editorState={editorState}
            inputType={INLINE_TYPES}
            onToggle={toggleInlineStyle}
            
        />
        <BlockStyleControls
         editorState={editorState}
         inputType={BLOCK_TYPES}
         onToggle={toggleBlockStyle}
         
        />
    </div>
    );
};

export default RichTextControlBar;
