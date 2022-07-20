import { SyntheticEvent, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "@mui/material/Link";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Box from "@mui/material/Box";
import { UseFormReturn, useFieldArray, useForm } from "react-hook-form";
import {
  UserWorkspaceAttributes,
  WorkspaceType,
  WorkspaceUsers,
} from "../../@types/Workspace";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../config/reduxConfig";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import postWorkspaceMembers from "../../utils/workspaces/postWorkspaceMembers";
import { setWorkspace } from "../../ducks";

export interface WorkspaceMembersProps {
  next?: (event: SyntheticEvent) => void;
  onClose?: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => void;
  workspaceData?: WorkspaceType
}

export default function WorkspaceMembers({ onClose, workspaceData }: WorkspaceMembersProps) {
  const { control, register, handleSubmit } = useForm<WorkspaceType>();
  const { fields, append } = useFieldArray({ control, name: "Users" });
  const workspace: WorkspaceType = useSelector(
    (state: RootState) => state.workspace
  );
  const userToken: string = useSelector((state: RootState) => state.userToken);
  const { mutate, isLoading } = useMutation<
    UserWorkspaceAttributes,
    AxiosError,
    WorkspaceUsers,
    void
  >((workspacesMembers) => postWorkspaceMembers(userToken, workspacesMembers));
    const dispatch = useDispatch();

  useEffect(() => {
    if (fields.length === 0) {
      append({ email: "" });
    }
  }, [fields]);

  const onSubmit = (values: WorkspaceType) => {
    const workspacesMembers: WorkspaceUsers = {
      WorkspaceId: workspaceData ? workspaceData.id : workspace.id,
      emails: values.Users.map((user) => user.email),
    };
    mutate(workspacesMembers, {
      onSuccess: () => {
        dispatch(setWorkspace(workspaceData ? workspaceData : workspace));
        onClose();
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
  next: () => {},
  OnClose: () => {},
  workspaceData: null,
};
