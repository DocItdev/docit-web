import React from "react";

const StyleButton = (props) => {
    const { onToggle, style, label, icon } = props;
    const onButtonToggle = (e)=>{
        e.preventDefault();
        onToggle(style);
    }

/** incorporate this section bellow to change styles when button is clicked
 * let className = "RichEditor-styleButton";  
    if (this.props.active) {
      className += " RichEditor-activeButton";
    } */

    return (
        <button onMouseDown={onButtonToggle}>
            <i className={icon}></i>
        </button>
    )
}

export default StyleButton;