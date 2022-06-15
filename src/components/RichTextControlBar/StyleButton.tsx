import { SyntheticEvent } from "react";

export interface StyleButtonProps {
    onToggle: (blockType: string) => void;
    active: boolean;
    label?: string;
    icon: string;
    style: string;
}

const StyleButton = (props: StyleButtonProps) => {
    const { onToggle, style, icon, active } = props;
    const onButtonToggle = (e: SyntheticEvent)=>{
        e.preventDefault();
        onToggle(style);
    }

// incorporate this section bellow to change styles when button is clicked
    let className = "RichTextIndividualButton";  
    if (active) {
        className += " RichTextIndividualButton-Active";
    } 

    return (
        <button onMouseDown={onButtonToggle} className={className}>
            <i className={icon}></i>
        </button>
    )
}

export default StyleButton;