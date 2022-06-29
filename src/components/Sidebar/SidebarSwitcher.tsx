import React, { useState } from 'react';
import PopperMenu from '../common/PopperMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../../config/reduxConfig';
import { WorkspaceType } from '../../@types/Workspace.';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { UserType } from '../../@types/User';
import WorkspaceDialog from '../WorkspaceDialog';

export default function SidebarSwitcher() {
  const workspace: WorkspaceType = useSelector((state: RootState) => state.workspace);
  const { Workspaces }: UserType = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState<boolean>();
  return (
    <PopperMenu 
      menuItems={
        Workspaces.map((workspace: WorkspaceType) => ({
          title: workspace.title,
          onClick: () => {},
          icon: null,
        }))
      }
      menuActions={[
        {title: 'Create workspace', onClick: () => setOpen(true)},
        {title: 'Join workspace', onClick: () => {}},
        {title: 'Add someone to workspace', onClick: () => {}},
      ]}
    >
      <Grid container>
        <Grid item>
          <Typography>
            {workspace.title}
          </Typography>
        </Grid>
      </Grid>
      <WorkspaceDialog open={open} onClose={() => setOpen(false)} />
    </PopperMenu>
  );
}