import React, { SyntheticEvent, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { WorkspaceType } from "../../@types/Workspace.";

export interface WorkspaceMembersProps {
  reactForm: UseFormReturn<WorkspaceType>;
  next?: (event: SyntheticEvent) => void;
}

export default function WorkspaceMembers({ reactForm }: WorkspaceMembersProps) {
  const { control, register } = reactForm;
  const { fields, append } = useFieldArray({ control, name: "Users" });
  useEffect(() => {
    if(fields.length === 0) {
      append({ email: '' });
    }
  }, [fields])
  return (
    <Container sx={{ height: "100vh" }}>
      <Typography variant="h2">
        Who are the members of this workspace?
      </Typography>
      {fields.map((field, index) => (
        <TextField
          variant="outlined"
          margin="normal"
          type="email"
          required
          fullWidth
          id={field.id}
          key={field.id}
          placeholder="Ex: john@gmail.com"
          label="email"
          autoFocus
          {...register(`Users.${index}.email`)}
        />
      ))}
      <Link
        underline="hover"
        onClick={() => append({ email: '' })}
        sx={{ display: "flex", flexDirection: "row", paddingY: "1rem" }}
      >
        <AddCircleOutlineRoundedIcon />
        <Typography>Add Teammates</Typography>
      </Link>
      <Box>
        <Button variant="contained">Add Members</Button>
      </Box>
    </Container>
  );
}
