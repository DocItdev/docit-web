import React, { SyntheticEvent, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
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
import { RootState } from "../../config/reduxConfig";
import { ProjectList } from "../../@types/Project";
import { AxiosError } from "axios";
import SidebarSwitcher from "./SidebarSwitcher";
import FeedbackModal from "./FeedbackModal";
import { useParams } from "react-router-dom";

export default function Sidebar({ drawerIsOpened, onClose }) {
  const [opened, setOpened] = useState<boolean>(false);
  const { userToken, editable } = useSelector(
    (state: RootState) => state
  );
  const { workspaceId, docId } = useParams()
  const dispatch = useDispatch();
  const { isLoading, data } = useQuery<ProjectList, AxiosError>(
    ["projects", workspaceId],
    () => fetchAllProjects(userToken, workspaceId),
    {
      enabled: workspaceId !== undefined || workspaceId !== null,
    }
  );

  const toggleOpened = (event: SyntheticEvent) => {
    event?.stopPropagation();
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
        <Grid container sx={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={10} sx={{ justifyItems: "flex-start" }}>
            <SidebarSwitcher />
          </Grid>
          <Grid item xs={2} sx={{ justifyItems: "flex-end" }}>
            <IconButton onClick={onClose}>
              <ChevronLeftIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Grid>
        </Grid>
      </DrawerHeader>
      {docId && (
        <FormControl style={{marginRight:"25%"}}>
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
            labelPlacement = 'start'
          />
        </FormControl>
      )}
      <Divider sx={{ marginTop: "10%", marginBottom: "5%" }} />
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
      <div style={{position:"fixed", bottom:"0"}}>
      <Divider sx={{ marginTop: "5%", marginBottom: "5%" }} />
      <FeedbackModal/>
      </div>
     
      
      <ProjectForm
        open={opened}
        onClose={toggleOpened}
        onMutate={(newProject) =>
          postProject(userToken, workspaceId, newProject)
        }
        title="CreateProject"
        buttonText="Create"
      />
      
    </Drawer>
  );
}
