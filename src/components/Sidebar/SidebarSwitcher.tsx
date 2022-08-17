import React from "react";
import PopperMenu from "../common/PopperMenu";
import { useSelector } from "react-redux";
import { RootState } from "../../config/reduxConfig";
import { WorkspaceType } from "../../@types/Workspace";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { UserType } from "../../@types/User";
import { useNavigate, useParams } from "react-router-dom";

export default function SidebarSwitcher() {
  const { workspaceId } = useParams();
  const { Workspaces }: UserType = useSelector(
    (state: RootState) => state.user
  );
  const workspace = Workspaces.find(
    (workspace: WorkspaceType) => workspace.id === workspaceId
  );
  const navigate = useNavigate();

  return (
    <PopperMenu
      menuItems={Workspaces.map((workspace: WorkspaceType) => ({
        title: workspace.title,
        onClick: () => {
          navigate(`../${workspace.id}`);
        },
        icon: null,
      }))}
      menuActions={[
        {
          title: "Create workspace",
          onClick: () => navigate(`/${workspaceId}/workspaces`),
        },
        !workspace.personal && {
          title: "Add someone to workspace",
          onClick: () => navigate(`/${workspaceId}/members`),
        },
      ]}
    >
      <Grid container>
        <Grid item>
          <Typography>{workspace.title}</Typography>
        </Grid>
      </Grid>
    </PopperMenu>
  );
}
