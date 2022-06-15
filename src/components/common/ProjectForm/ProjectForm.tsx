import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import Modal from "../Modal";
import AsyncButton from "../AsyncButton";
import { AxiosError } from "axios";
import { ProjectType } from "../../../@types/Project";

export interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  title: string;
  buttonText: string;
  onMutate?: (projectData: ProjectType) => Promise<void>;
  onSuccess?: () => Promise<void>;
  initialValues?: {
    projectName: string;
    projectDescription: string;
  }
}

export default function ProjectForm({
  open,
  onClose,
  title,
  buttonText,
  onMutate,
  onSuccess,
  initialValues,
}: ProjectFormProps) {
  const { register, handleSubmit, reset } = useForm<ProjectType>();
  const queryClient = useQueryClient();
  const { isLoading, isError, error, mutate } = useMutation<
    void,
    AxiosError,
    ProjectType,
    void
  >(onMutate, {
    onSuccess: () => {
      onSuccess();
      onClose();
      reset(null, {
        keepValues: false,
      });
      queryClient.invalidateQueries("projects");
    },
  });

  const onSubmit = (values: ProjectType) => {
    mutate(values);
  };

  return (
    <Modal title={title} open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          defaultValue={initialValues.projectName}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="projectName"
          label="Name"
          autoFocus
          {...register("name")}
        />
        <TextField
          defaultValue={initialValues.projectDescription}
          variant="outlined"
          margin="normal"
          fullWidth
          id="projectDescription"
          label="Description"
          {...register("description")}
        />
        <AsyncButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          loading={isLoading}
          error={isError && error.message}
        >
          {buttonText}
        </AsyncButton>
      </form>
    </Modal>
  );
}

ProjectForm.defaultProps = {
  onSuccess: () => {},
  initialValues: {
    projectName: '',
    projectDescription: '',
  },
};
