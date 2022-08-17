import React, { SyntheticEvent, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "@mui/material/Link";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Box from "@mui/material/Box";
import { useFieldArray, useForm } from "react-hook-form";
import {
  UserWorkspaceAttributes,
  WorkspaceType,
  WorkspaceUsers,
} from "../../@types/Workspace";
import { useSelector } from "react-redux";
import { RootState } from "../../config/reduxConfig";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import postWorkspaceMembers from "../../utils/workspaces/postWorkspaceMembers";
import { useNavigate, useParams } from "react-router-dom";

export interface WorkspaceMembersProps {
  next?: (event: SyntheticEvent) => void;
  onClose?: (event?: Record<string, unknown>, reason?: "backdropClick" | "escapeKeyDown") => void;
  workspaceData?: WorkspaceType
}

export default function WorkspaceMembers({ onClose, workspaceData }: WorkspaceMembersProps) {
  const { control, register, handleSubmit } = useForm<WorkspaceType>();
  const { fields, append } = useFieldArray({ control, name: "Users" });
  const userToken: string = useSelector((state: RootState) => state.userToken);
  const { workspaceId } = useParams();
  const { mutate, isLoading } = useMutation<
    UserWorkspaceAttributes,
    AxiosError,
    WorkspaceUsers,
    void
  >((workspacesMembers) => postWorkspaceMembers(userToken, workspacesMembers));
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();
    const workspaceData = (location.state as { workspaceData: WorkspaceType })?.workspaceData
    console.log('loc state', location.state);
  useEffect(() => {
    if (fields.length === 0) {
      append({ email: "" });
    }
  }, [fields]);

  const onSubmit = (values: WorkspaceType) => {
    const selectedWorkspaceId = workspaceData ? workspaceData.id : workspaceId;
    console.log('selected workspace', selectedWorkspaceId);
    const workspacesMembers: WorkspaceUsers = {
      WorkspaceId: selectedWorkspaceId,
      emails: values.Users.map((user) => user.email),
    };
    mutate(workspacesMembers, {
      onSuccess: () => {
        if (selectedWorkspaceId === workspaceData?.id) {
          queryClient.invalidateQueries('refreshToken');
        }
        navigate(`/${selectedWorkspaceId}`);
      },
    });
  };
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
        onClick={() => append({ email: "" })}
        sx={{ display: "flex", flexDirection: "row", paddingY: "1rem" }}
      >
        <AddCircleOutlineRoundedIcon />
        <Typography>Add Teammates</Typography>
      </Link>
      <Box>
        <LoadingButton
          loading={isLoading}
          onClick={handleSubmit(onSubmit)}
          variant="contained"
        >
          Add Members
        </LoadingButton>
      </Box>
    </Container>
  );
}

WorkspaceMembers.defaultProps = {
  next: () => null,
  OnClose: () => null,
  workspaceData: null,
};
