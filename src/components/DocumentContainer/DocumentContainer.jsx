import React from "react";
import { useSelector } from 'react-redux';
import './DocumentContainer.css';
import PostPortal from "../PostPortal/PostPortal";
import PostBar from "../Postbar/Postbar";

export default function DocumentContainer() {
  const editable = useSelector(state => state.editable);
  return (
    <div className="container">
      <div style={{height:`${editable ? "83%" : "100%"}`, margin:"0px", overflowY: "scroll", width:"100%"}}>
        <PostPortal />
      </div>
      
      {editable &&
        <div style={{
          position: "absolute", marginBottom:"15px", marginLeft: "11px", width:"82%", bottom: "0"}}>
          <PostBar/>
        </div>}
    </div>
  );
}
