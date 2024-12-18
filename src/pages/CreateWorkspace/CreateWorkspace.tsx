import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { WorkspaceType } from "../../@types/Workspace";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import postWorkspace from "../../utils/workspaces/postWorkspace";
import { useSelector } from "react-redux";
import { RootState } from "../../config/reduxConfig";
import { useNavigate } from "react-router-dom";


export default function CreateWorkspace() {
  const reactForm = useForm<WorkspaceType>();
  const { register, watch, handleSubmit } = reactForm;
  const userToken: string = useSelector((state: RootState) => state.userToken);
  const { mutate, isLoading, isError, error } = useMutation<
    WorkspaceType,
    AxiosError,
    WorkspaceType,
    void
  >((workspaceData) => postWorkspace(userToken, workspaceData));
  const navigate = useNavigate();

  const onSubmit = async (values: WorkspaceType) => {
    mutate(values, {
      onSuccess: (data) => {
       navigate('../members', { state: { workspaceData: data } });
      },
    });
  };
  return (
    <Container>
      <Typography variant="h2">
        What is the name of your team or company?
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
        placeholder="Ex: DocIt Team"
        label="Title"
        autoFocus
        error={isError}
        helperText={isError && error?.response?.data?.message}
        {...register("title")}
      />
      <LoadingButton
        onClick={handleSubmit(onSubmit)}
        variant="contained"
        disabled={!watch().title}
        loading={isLoading}
      >
        Next
      </LoadingButton>
    </Container>
  );
}
