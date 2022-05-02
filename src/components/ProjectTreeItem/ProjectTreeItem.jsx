import React, { useState } from "react";
import { TreeItem } from "@mui/lab";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import { Delete, Add, ModeEdit, AddBoxOutlined } from "@mui/icons-material";

import styles from "./ProjectTreeItem.module.css";
import postDocument from "../../utils/documents/postDocument";
import deleteProject from "../../utils/projects/deleteProject";
import updateProject from "../../utils/projects/updateProject";
import DocumentForm from "../common/DocumentForm";
import PopperMenu from "../common/PopperMenu";
import ProjectForm from "../common/ProjectForm";

export default function ProjectTreeItem({
  projectName,
  projectId,
  projectDescription,
  children,
}) {
  const [opened, setOpened] = useState(false);
  const [projOpened, setProjOpened] = useState(false);
  const userToken = useSelector((state) => state.userToken);
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    () => deleteProject(projectId, userToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projects");
      },
    }
  );

  const toggleOpened = (event) => {
    event?.stopPropagation();
    setOpened(!opened);
  };

  const toggleProjOpened = (event) => {
    event?.stopPropagation();
    setProjOpened(!projOpened);
  };

  const handleDelete = (event) => {
    event?.stopPropagation();
    deleteMutation.mutate();
  };

  const actionButtons = [
    { icon: ModeEdit, title: "Edit Project", onClick: toggleProjOpened },
    { icon: Add, title: "Create Document", onClick: toggleOpened },
    { icon: Delete, title: "Delete", onClick: handleDelete },
  ];

  return (
    <TreeItem
      nodeId={projectId}
      label={
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={9} className={styles.projectTitle}>
              <Typography component="span">{projectName}</Typography>
            </Grid>
            <Grid item xs={3}>
              <PopperMenu menuItems={actionButtons} />
            </Grid>
          </Grid>
          <DocumentForm
            title="Create Document"
            buttonText="Create"
            open={opened}
            onClose={toggleOpened}
            onMutate={(newDoc) => postDocument(userToken, projectId, newDoc)}
          />
          <ProjectForm
            title="Update Project"
            buttonText="update"
            open={projOpened}
            onClose={toggleProjOpened}
            onMutate={(projectData) =>
              updateProject(userToken, projectId, projectData)
            }
            initialValues={{ projectName, projectDescription }}
          />
        </Box>
      }
    >
      {children}
      <TreeItem
        nodeId="new-document"
        onClick={toggleOpened}
        label={
          <Box>
            <Grid container>
              <Grid item className={styles.projectTitle}>
                <AddBoxOutlined sx={{ marginRight: 1 }} />
                <Typography component="span">New Document</Typography>
              </Grid>
            </Grid>
          </Box>
        }
      />
    </TreeItem>
  );
}
