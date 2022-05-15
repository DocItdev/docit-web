import React, { useState } from "react";
import {
  Button,
  Typography,
  Switch,
  FormControl,
  FormControlLabel,
  Drawer,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ProjectTreeView from "../ProjectTreeView";
import styles from "./Sidebar.module.css";
import ProjectForm from "../common/ProjectForm";
import Loader from "../common/Loader";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import fetchAllProjects from "../../utils/projects/fetchAllProjects";
import postProject from "../../utils/projects/postProject";
import { setEditable } from "../../ducks";
import { DrawerHeader } from "./styles";
import { drawerWidth } from "../../utils/common/constants";

export default function Sidebar({ drawerIsOpened, onClose }) {
  const [opened, setOpened] = useState(false);
  const { userToken, editable, selectedDocId } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { isLoading, data } = useQuery(
    "projects",
    () => fetchAllProjects(userToken),
    {
      enabled:
        userToken !== undefined || userToken !== "" || userToken !== null,
    }
  );

  const toggleOpened = () => {
    setOpened(!opened);
  };

  const handleChange = (event) => {
    dispatch(setEditable(event.target.checked));
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          overflowY: "auto",
          backgroundColor: "#1F5980",
          color: "#fff",
          padding: "1%",
        },
      }}
      variant="persistent"
      anchor="left"
      open={drawerIsOpened}
    >
      <DrawerHeader>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon sx={{ color: "#fff" }} />
        </IconButton>
      </DrawerHeader>
      {selectedDocId && (
        <FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={editable}
                onChange={handleChange}
                color="warning"
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Edit Document"
          />
        </FormControl>
      )}
      <Button
        variant="outlined"
        className={styles.newProjectButton}
        onClick={toggleOpened}
      >
        <Typography component="span">New Project</Typography>
      </Button>
      <ProjectTreeView projects={data.projects} />
      <ProjectForm
        open={opened}
        onClose={toggleOpened}
        onMutate={(newProject) => postProject(userToken, newProject)}
        title="CreateProject"
        buttonText="Create"
      />
    </Drawer>
  );
}
