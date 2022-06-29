import React, { SyntheticEvent } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { UseFormReturn } from 'react-hook-form';
import { WorkspaceType } from '../../@types/Workspace.';

export interface WorkspaceIdentifyProps {
  reactForm: UseFormReturn<WorkspaceType>
  next: (event: SyntheticEvent) => void,
}

export default function WorkspaceIdentify({ reactForm, next }: WorkspaceIdentifyProps) {
  const { register, watch } = reactForm;
  return (
    <Container>
      <Typography variant="h2">
        What is the workspace name?
      </Typography>
      <Typography variant="subtitle1">
        This will be the unique identifier of your workspace.
      </Typography>
      <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="workspaceName"
          placeholder='Ex: docit-team'
          label="Name"
          autoFocus
          {...register("name")}
        />
      <Button onClick={next} variant='contained' disabled={!watch().name}>
        Next
      </Button>
    </Container>
  )
}