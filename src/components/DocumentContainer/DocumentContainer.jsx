import React from "react";
import { useSelector } from 'react-redux';
import './DocumentContainer.css';
import PostPortal from "../PostPortal/PostPortal";
import PostBar from "../Postbar/Postbar";

export default function DocumentContainer() {
  const editable = useSelector(state => state.editable);
  return (
    <div className="container">
      <PostPortal />
      {editable &&
        <div style={{position: "sticky", bottom: "0"}}>
          <PostBar/>
        </div>}
    </div>
  );
}
