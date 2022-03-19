import React, { useState } from "react";
import { TreeItem } from "@mui/lab";
import { Box, Typography,Button, Grid } from "@mui/material";
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from "react-query";
import { Delete, Add, ModeEdit } from '@mui/icons-material';

import styles from './ProjectTreeItem.module.css';
import postDocument from "../../utils/documents/postDocument";
import deleteProject from '../../utils/projects/deleteProject';
import DocumentForm from "../common/DocumentForm";
import SideMenu from "../common/SideMenu";


export default function ProjectTreeItem({ projectName, projectId, children }) {
  const [opened, setOpened] = useState(false);
  const userToken = useSelector(state => state.userToken);
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    () => deleteProject(projectId, userToken), {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
      }
  });

  const toggleOpened = () => {
    setOpened(!opened);
  };

  const actionButtons = [
    { icon: ModeEdit, title: 'Edit Project' },
    { icon: Add, title: 'Create Document', onClick: toggleOpened },
    { icon: Delete, title: 'Delete', onClick: () => deleteMutation.mutate() }
  ]

  return (
    <TreeItem
      nodeId={projectId}
      label={
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={9} className={styles.projectTitle}>
              <Typography  component="span">{projectName}</Typography>
            </Grid>
            <Grid item xs={3}>
              <SideMenu
                menuItems={actionButtons}
              />
            </Grid>
          </Grid>
          <DocumentForm
            title="Create Document"
            buttonText="Create"
            open={opened}
            onClose={toggleOpened}
            onMutate={newDoc => postDocument(userToken, projectId, newDoc)}
            onSuccess={() => toggleOpened()}
          />
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
