import React from "react";
import { TreeItem } from "@mui/lab";
import { Grid, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import styles from "./DocTreeItem.module.css";
import deleteDocument from "../../utils/documents/deleteDocument";
import { setDocId } from "../../ducks";

export default function DocTreeItem({ docName, docId }) {
  const {userToken, editable} = useSelector((state) => state);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => deleteDocument(docId, userToken), {
    onSuccess: () => {
      queryClient.invalidateQueries("projects");
    },
  });
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(setDocId(docId));
  }

  return (
    <TreeItem
      nodeId={docId}
      onClick={handleClick}
      label={
        <Grid
          container
          spacing={2}
          className={styles.container}
        >
          <Grid item xs={editable ? 8 : 10} className={styles.docTitle}>
            <i className="bi bi-file-earmark-text"></i>
            <Typography className={styles.text} component="span">
              {docName}
            </Typography>
          </Grid>
          {editable && (
            <Grid item xs={2}>
              <div className={styles.iconButton} >
                <i className="bi bi-pen"></i>
              </div>
            </Grid>
          )}
          <Grid item xs={2}>
            <div className={styles.iconButton} onClick={() => mutate()}>
              <i className="bi bi-trash"></i>
            </div>
          </Grid>
        </Grid>
      }
    />
  );
}
