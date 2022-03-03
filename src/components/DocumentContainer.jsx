import React from "react";
import '../styles/DocumentContainer.css';
import PostPortal from "./PostPortal";
import Postbar from "./Postbar/Postbar";

export default function DocumentContainer() {
  return (
    <div className="container">
      <PostPortal />
      <Postbar/>
    </div>
  );
}
