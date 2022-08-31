import React, { SyntheticEvent, useState, ReactNode } from "react";
import { TreeItem } from "@mui/lab";
import { Box, Typography, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import { Delete, Add, ModeEdit, AddBoxOutlined } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import "./ProjectTreeItem.css";
import postDocument from "../../utils/documents/postDocument";
import deleteProject from "../../utils/projects/deleteProject";
import updateProject from "../../utils/projects/updateProject";
import DocumentForm from "../common/DocumentForm";
import PopperMenu from "../common/PopperMenu";
import ProjectForm from "../common/ProjectForm";
import { RootState } from "../../config/reduxConfig";
import { useParams } from "react-router-dom";

export interface ProjectTreeItemProps {
  projectName: string;
  projectId: string;
  projectDescription: string;
  children: ReactNode;
}

export default function ProjectTreeItem({
  projectName,
  projectId,
  projectDescription,
  children,
}: ProjectTreeItemProps) {
  const [opened, setOpened] = useState<boolean>(false);
  const [projOpened, setProjOpened] = useState<boolean>(false);
  const userToken: string = useSelector((state: RootState) => state.userToken);
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    () => deleteProject(projectId, userToken, workspaceId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projects");
      },
    }
  );
  const [hover, setHover] = useState(false);

  const handleOnMouseEnter = () => {
    setHover(true);
  };

  const handleOnMouseLeave = () => {
    setHover(false);
  };

  const toggleOpened = (event: SyntheticEvent) => {
    event?.stopPropagation();
    setOpened(!opened);
  };

  const toggleProjOpened = () => {
    setProjOpened(!projOpened);
  };

  const handleDelete = (event: SyntheticEvent) => {
    event?.stopPropagation();
    deleteMutation.mutate();
  };

  const actionButtons = [
    { icon: ModeEdit, title: "Rename", onClick: toggleProjOpened },
    { icon: Add, title: "Create Document", onClick: toggleOpened },
    { icon: Delete, title: "Delete", onClick: handleDelete },
  ];

  return (
    <TreeItem
      nodeId={projectId}
      label={
        <Box
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        >
          <Grid
            container
            spacing={1}
            sx={{ minHeight: 44, alignItems: "center" }}
          >
            <Grid item xs={10} className="projectTitle">
              <Typography component="span">{projectName}</Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                display: "none",
                ...(hover && { display: "flex" }),
              }}
            >
              <PopperMenu menuItems={actionButtons}>
                <MoreVertIcon />
              </PopperMenu>
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
              updateProject(userToken, workspaceId, { ...projectData, id: projectId, })
            }
            initialValues={{ projectName, projectDescription }}
          />
        </Box>
      }
    >
      {children}
      <TreeItem
        nodeId={`${projectId}-new-document`}
        onClick={toggleOpened}
        label={
          <Box>
            <Grid container sx={{ minHeight: 44, alignItems: "center" }}>
              <Grid item className="projectTitle">
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
