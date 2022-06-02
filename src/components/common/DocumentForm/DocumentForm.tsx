import { SyntheticEvent } from "react";
import TextField from "@mui/material/TextField";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";

import Modal from "../Modal";
import AsyncButton from "../AsyncButton";

export interface Document {
  name: string;
}

export interface DocumentFormProps {
  open: boolean;
  buttonText: string;
  title: string;
  initialValues?: {
    title?: string;
  };
  onClose: () => void;
  onMutate?: () => Promise<void>;
}

export default function DocumentForm({
  open,
  buttonText,
  title,
  onClose,
  onMutate,
  initialValues,
}: DocumentFormProps) {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const { isLoading, isError, error, mutate } = useMutation<
    void,
    AxiosError,
    Document,
    void
  >(onMutate, {
    onSuccess: () => {
      queryClient.invalidateQueries("projects");
      onClose();
      reset({
        keepValues: false,
        keepErrors: false,
      });
    },
  });

  const onSubmit = (values: Document) => {
    mutate(values);
  };
  return (
    <Modal
      onClick={(event: SyntheticEvent) => event.stopPropagation()}
      title={title}
      open={open}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          defaultValue={initialValues.title}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="docTitle"
          label="Title"
          autoFocus
          {...register("name")}
        />
        <AsyncButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          loading={isLoading}
          error={isError ? error.message : ""}
        >
          {buttonText}
        </AsyncButton>
      </form>
    </Modal>
  );
}

DocumentForm.defaultProps = {
  initialValues: {
    title: "",
  },
};
