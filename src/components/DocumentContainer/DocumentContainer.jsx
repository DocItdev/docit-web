import React from "react";
import './DocumentContainer.css';
import PostPortal from "../PostPortal/PostPortal";
import PostBar from "../Postbar/Postbar";

export default function DocumentContainer() {
  return (
    <div className="container">
      <PostPortal />
      <PostBar/>
    </div>
  );
}
