import React from "react";
import { useSelector } from "react-redux";
import "./DocumentContainer.css";
import { Container } from "@mui/material";
import { RootState } from "../../config/reduxConfig";
import Editor from "../../components/Editor";

export default function DocumentContainer() {
  const editable: boolean = useSelector((state: RootState) => state.editable);
  return (
    <Container
      style={{
        marginTop: "10px",
        paddingBottom: "10px",
        position: "sticky",
        bottom: "0",
        zIndex: "1",
      }}
    >
      <Editor />
    </Container>
  );
}
