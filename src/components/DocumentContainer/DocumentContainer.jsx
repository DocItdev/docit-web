import React from "react";
import { useSelector } from 'react-redux';
import './DocumentContainer.css';
import PostPortal from "../PostPortal/PostPortal";
import PostBar from "../Postbar/Postbar";
import { Container } from "@mui/material";
import { Box } from "@mui/system";

export default function DocumentContainer() {
  const editable = useSelector(state => state.editable);
  return (
    <div className="document-container">
      <Box style={{height: `${editable ? "83%" : "100%"}`, margin: "0px", overflowY: "scroll", width: "100%" }}>
        <Container
          style={{
            width: "60%",  
            paddingBottom:"10px",
          }}
        >
          <PostPortal />
        </Container>
      </Box>
      <Container 
          style={{
            marginTop: "10px",
            
            paddingBottom:"10px",
            width: "60%",
            position:"sticky",
            bottom:"0",
            zIndex:"1"
          }}
        >
          {
            editable && <PostBar 
              style={{
                position:"sticky",
                bottom:"0",
              }}
            />
          }
        </Container>
    </div>
  );
}

/**
 * <div className="document-container">
      <div style={{height:`${editable ? "83%" : "100%"}`, margin:"0px", overflowY: "scroll", width:"100%"}}>
        <PostPortal />
      </div>
      
      {editable &&
        <div style={{
          position: "absolute", marginBottom:"15px", marginLeft: "11px", width:"82%", bottom: "0"}}>
          <PostBar/>
        </div>}
    </div>
 */