import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import "./DocumentContainer.css";
import PostPortal from "../../components/PostPortal/PostPortal";
import PostBar from "../../components/Postbar/Postbar";
import { Container } from "@mui/material";
import { RootState } from "../../config/reduxConfig";

export default function DocumentContainer() {
  const editable: boolean = useSelector((state: RootState) => state.editable);
  return (
    <>
      <Box
        style={{
          height: `${editable ? "83%" : "100%"}`,
          margin: "0px",
          overflowY: "scroll",
          width: "100%",
        }}
      >
        <Container
          style={{
            width: "60%",
            paddingBottom: "10px",
          }}
        >
          <PostPortal />
        </Container>
      </Box>
      <Container
        style={{
          marginTop: "10px",

          paddingBottom: "10px",
          width: "60%",
          position: "sticky",
          bottom: "0",
          zIndex: "1",
        }}
      >
        {editable && <PostBar />}
      </Container>
    </>
  );
}
