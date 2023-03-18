import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import "./DocumentContainer.css";
import { Container } from "@mui/material";
import { RootState } from "../../config/reduxConfig";
import Editor from "../../components/Editor";
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import getDocument from "../../utils/documents/getDocument";
import Loader from "../../components/common/Loader/Loader";

export default function DocumentContainer() {
  const { docId, projectId } = useParams();
  const userToken: string = useSelector((state:RootState) => state.userToken);
  const { isLoading, data } = useQuery(docId, () => getDocument(userToken, projectId, docId), {
    refetchOnWindowFocus: false,
  })
  return isLoading ?  <Loader /> : (
    <Container
      style={{
        marginTop: "10px",
        paddingBottom: "10px",
        position: "sticky",
        bottom: "0",
        zIndex: "1",
      }}
    >
      <Editor docData={data} />
    </Container>
  );
}
