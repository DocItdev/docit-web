import React, { SyntheticEvent } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { UseFormReturn } from 'react-hook-form';
import { WorkspaceType } from '../../@types/Workspace.';

export interface TeamIdentifyProps {
  reactForm: UseFormReturn<WorkspaceType>
  next: (event: SyntheticEvent) => void,
}

export default function TeamIdentify({ reactForm, next }: TeamIdentifyProps) {
  const { register, watch } = reactForm;
  return (
    <Container>
      <Typography variant="h2">
        What's the name of your team or company?
      </Typography>
      <Typography variant="subtitle1">
        This will be the display name of your workspace.
      </Typography>
      <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="workspaceTitle"
          placeholder='Ex: DocIt Team'
          label="Title"
          autoFocus
          {...register("title")}
        />
      <Button onClick={next} variant='contained' disabled={!watch().title}>
        Next
      </Button>
    </Container>
  )
}