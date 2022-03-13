import React from "react";
import './DocumentContainer.css';
import PostPortal from "../PostPortal/PostPortal";
import PostBar from "../Postbar/Postbar";
import { Paper } from "@mui/material";

export default function DocumentContainer() {
  return (
    <div className="container">
      <PostPortal />
      <Paper elevation={4}>
        <PostBar/>
      </Paper>
    </div>
  );
}
