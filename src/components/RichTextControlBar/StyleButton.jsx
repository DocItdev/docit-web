import React from "react";

const StyleButton = (props) => {
    const { onToggle, style, label, icon, active } = props;
    const onButtonToggle = (e)=>{
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