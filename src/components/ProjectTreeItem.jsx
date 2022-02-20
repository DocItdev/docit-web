import React, { useState } from "react";
import { TreeItem } from "@mui/lab";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useDispatch } from 'react-redux';
import AsyncButton from "./common/AsyncButton";
import getTreeNodeId from "../utils/getTreeNodeId";
import Modal from "./common/Modal";
import styles from '../styles/ProjectTreeItem.module.css';
import useAsyncForm from '../hooks/useAsyncForm'
import { setDocument } from "../ducks/projects";

export default function ProjectTreeItem({ projectName, projectId, children, ...props }) {
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleAsyncSubmit,
    loading,
    asyncError
  } = useAsyncForm(
    `/api/documents?projectId=${projectId}`,
    (data) => {
      dispatch(setDocument({ projectId, doc: data }))
      setOpened(false);
    },
    (err) => console.log(err)
  );

  const toggleOpened = () => {
    setOpened(!opened);
  };
  return (
    <TreeItem
      {...props}
      nodeId={getTreeNodeId()}
      label={
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6} >
              <Typography  component="span">{projectName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={toggleOpened} className={styles.iconButton}>
                <i className="bi bi-plus"></i>
              </Button>
            </Grid>
          </Grid>
          <Modal title="Create Document" open={opened} onClose={toggleOpened}>
            <form onSubmit={handleAsyncSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="docTitle"
                label="Title"
                autoFocus
                {...register('name')}
              />
              <AsyncButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                loading={loading}
                error={asyncError}
              >
                Create
              </AsyncButton>
            </form>
          </Modal>
        </Box>
      }
    >
      {children}
      <Button onClick={toggleOpened}>
        <i className="bi bi-plus"></i>
        <Typography component="span">
          New Document
        </Typography>
      </Button>
    </TreeItem>
  );
}
