import React, { useState } from "react";
import {
  Button,
  Typography,
  Switch,
  FormControl,
  FormControlLabel,
  Drawer,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddIcon from "@mui/icons-material/Add";
import ProjectTreeView from "../ProjectTreeView";
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
  const { userToken, editable, selectedDocId, user } = useSelector(
    (state) => state
  );
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
        <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid item xs={10} sx={{ justifyItems: 'flex-start' }}>
            <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
          </Grid>
          <Grid item xs={2} sx={{ justifyItems: 'flex-end' }}>
            <IconButton onClick={onClose}>
              <ChevronLeftIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Grid>
        </Grid>
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
      <Divider sx={{ marginTop: "5%", marginBottom: "5%" }} />
      <ProjectTreeView projects={data.projects} />
      <Divider sx={{ marginTop: "5%", marginBottom: "5%" }} />
      <Button
        onClick={toggleOpened}
        sx={{
          color: "#fff",
          width: "100%",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
          },
        }}
      >
        <AddIcon sx={{ marginRight: "5%" }} />
        <Typography component="span">New Project</Typography>
      </Button>
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
