import React, { useState } from "react";
import PopperMenu from "../common/PopperMenu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../config/reduxConfig";
import { WorkspaceType } from "../../@types/Workspace";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { UserType } from "../../@types/User";
import WorkspaceDialog from "../WorkspaceDialog";
import { setWorkspace } from "../../ducks";
import Dialog from "@mui/material/Dialog";
import WorkspaceMembers from "../WorkspaceDialog/WorkspaceMembers";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import getWorkspaces from "../../utils/workspaces/getWorkspaces";

export default function SidebarSwitcher() {
  const workspace: WorkspaceType = useSelector(
    (state: RootState) => state.workspace
  );
  const userToken: string = useSelector(
    (state: RootState) => state.userToken
  );
    const { data: workspaces, isLoading } = useQuery<WorkspaceType[], AxiosError>(
      "workspaces",
      () => getWorkspaces(userToken),
      {
        enabled: workspace !== undefined || workspace !== null
      }
    );
  const [open, setOpen] = useState<boolean>();
  const [openUsersModal, setOpenUsersModal] = useState<boolean>();
  const dispatch = useDispatch();
  return (
    <PopperMenu
      menuItems={ isLoading? [] : workspaces.map((workspace: WorkspaceType) => ({
        title: workspace.title,
        onClick: () => {
          dispatch(setWorkspace(workspace));
        },
        icon: null,
      }))}
      menuActions={[
        { title: "Create workspace", onClick: () => setOpen(true) },
        {
          title: "Add someone to workspace",
          onClick: () => setOpenUsersModal(true),
        },
      ]}
    >
      <Grid container>
        <Grid item>
          <Typography>{workspace.title}</Typography>
        </Grid>
      </Grid>
      <WorkspaceDialog open={open} onClose={() => setOpen(false)} />
      <Dialog
        fullScreen
        open={openUsersModal}
        onClose={() => setOpenUsersModal(false)}
      >
        <WorkspaceMembers />
      </Dialog>
    </PopperMenu>
  );
}
