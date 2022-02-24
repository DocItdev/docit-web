import React, { useState } from "react";
import { TreeItem } from "@mui/lab";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from "react-query";
import AsyncButton from "./common/AsyncButton";
import getTreeNodeId from "../utils/getTreeNodeId";
import Modal from "./common/Modal";
import styles from '../styles/ProjectTreeItem.module.css';
import postDocument from "../utils/postDocument";


export default function ProjectTreeItem({ projectName, projectId, children, ...props }) {
  const [opened, setOpened] = useState(false);
  const { register, handleSubmit } = useForm();
  const userToken = useSelector(state => state.userToken);
  const queryClient = useQueryClient();
  const {isLoading, isError, error, mutate} = useMutation(
    newDoc => postDocument(userToken, projectId, newDoc), {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
      }
    });

  const toggleOpened = () => {
    setOpened(!opened);
  };

  const onSubmit = (values) => {
    mutate(values);
    toggleOpened();
  }
  return (
    <TreeItem
      {...props}
      nodeId={getTreeNodeId()}
      label={
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6} style={{ display: 'flex', alignItems: 'flex-start', justifyItems: 'flex-start' }}>
              <Typography  component="span">{projectName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={toggleOpened} className={styles.iconButton}>
                <i className={`bi bi-plus-circle ${styles.icon}`}></i>
              </Button>
            </Grid>
          </Grid>
          <Modal title="Create Document" open={opened} onClose={toggleOpened}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                loading={isLoading}
                error={isError && error}
              >
                Create
              </AsyncButton>
            </form>
          </Modal>
        </Box>
      }
    >
      {children}
      <Button onClick={toggleOpened} className={styles.newDocButton}>
        <i className={`bi bi-plus ${styles.newDocIcon}`}></i>
        <Typography component="span">
          New Document
        </Typography>
      </Button>
    </TreeItem>
  );
}
