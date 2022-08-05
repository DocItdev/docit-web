import React, { SyntheticEvent, useState } from "react";
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

export default function SidebarSwitcher() {
  const workspace: WorkspaceType = useSelector(
    (state: RootState) => state.workspace
  );
  const { Workspaces }: UserType = useSelector(
    (state: RootState) => state.user
  );
  const [open, setOpen] = useState<boolean>();
  const [openUsersModal, setOpenUsersModal] = useState<boolean>();
  const dispatch = useDispatch();
  return (
    <>
      <PopperMenu
        menuItems={Workspaces.map((workspace: WorkspaceType) => ({
          title: workspace.title,
          onClick: () => {
            dispatch(setWorkspace(workspace));
          },
          icon: null,
        }))}
        menuActions={[
          { title: "Create workspace", onClick: () => setOpen(true) },
          !workspace.personal && {
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
      </PopperMenu>
      <WorkspaceDialog open={open} onClose={() => setOpen(false)} />
      <Dialog
        fullScreen
        open={openUsersModal}
        onClose={(e: SyntheticEvent) => {
          e.stopPropagation();
          setOpenUsersModal(false);
        }}
      >
        <WorkspaceMembers />
      </Dialog>
    </>
  );
}
