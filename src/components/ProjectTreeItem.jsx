import React, { useState } from "react";
import { TreeItem } from "@mui/lab";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from "react-query";
import AsyncButton from "./common/AsyncButton";
import Modal from "./common/Modal";
import styles from '../styles/ProjectTreeItem.module.css';
import postDocument from "../utils/documents/postDocument";
import deleteProject from '../utils/projects/deleteProject';


export default function ProjectTreeItem({ projectName, projectId, children }) {
  const [opened, setOpened] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const userToken = useSelector(state => state.userToken);
  const queryClient = useQueryClient();
  const {isLoading, isError, error, mutate} = useMutation(
    newDoc => postDocument(userToken, projectId, newDoc), {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
      }
    });
  const deleteMutation = useMutation(
    () => deleteProject(projectId, userToken), {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
      }
  })

  const toggleOpened = () => {
    setOpened(!opened);
  };

  const onSubmit = (values) => {
    mutate(values);
    toggleOpened();
    reset({
      keepValues: false,
      keepErrors: false,
    })
  }
  return (
    <TreeItem
      nodeId={projectId}
      label={
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={8} className={styles.projectTitle}>
              <Typography  component="span">{projectName}</Typography>
            </Grid>
            <Grid item xs={2}>
              <div onClick={toggleOpened} className={styles.iconButton}>
                <i className={`bi bi-plus ${styles.icon}`}></i>
              </div>
            </Grid>
            <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
              <div onClick={() => deleteMutation.mutate()} className={styles.iconButton}>
                <i className="bi bi-trash" style={{ color: '#fff' }}></i>
              </div>
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
