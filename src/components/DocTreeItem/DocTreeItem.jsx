import React, { useState } from "react";
import { TreeItem } from "@mui/lab";
import { Grid, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { Delete, ModeEdit } from '@mui/icons-material';

import styles from "./DocTreeItem.module.css";
import deleteDocument from "../../utils/documents/deleteDocument";
import { setDocId } from "../../ducks";
import DocumentForm from "../common/DocumentForm";
import updateDocument from "../../utils/documents/updateDocument";
import SideMenu from "../common/PopperMenu";

export default function DocTreeItem({ docName, docId }) {
  const { userToken } = useSelector((state) => state);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => deleteDocument(docId, userToken), {
    onSuccess: () => {
      queryClient.invalidateQueries("projects");
    },
  });
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);

   const handleClick = () => {
    dispatch(setDocId(docId));
  }

  const toggleOpened = () => {
    setOpened(!opened);
  }

  const actionButtons = [
    { icon: ModeEdit, title: 'Edit Document', onClick: toggleOpened },
    { icon: Delete, title: 'Delete', onClick: () => mutate() },
  ];
  return (
    <>
      <TreeItem
        nodeId={docId}
        onClick={handleClick}
        label={
          <Grid container spacing={2} className={styles.container}>
            <Grid item xs={9} className={styles.docTitle}>
              <i className="bi bi-file-earmark-text"></i>
              <Typography className={styles.text} component="span">
                {docName}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <SideMenu menuItems={actionButtons} />
            </Grid>
          </Grid>
        }
      />
      <DocumentForm
        title="Update Document"
        buttonText="Update"
        open={opened}
        onClose={toggleOpened}
        onMutate={docData => updateDocument(userToken, docId, docData)}
        onSuccess={toggleOpened}
        initialValues={{ title: docName }}
      />
    </>
  );
}
