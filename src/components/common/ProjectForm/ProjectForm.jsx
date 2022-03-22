import React from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import PropTypes from "prop-types";

import Modal from "../Modal";
import AsyncButton from "../AsyncButton";

export default function ProjectForm({
  open,
  onClose,
  title,
  buttonText,
  onMutate,
  onSuccess,
  initialValues,
}) {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const { isLoading, isError, error, mutate } = useMutation(onMutate, {
    onSuccess: () => {
      onSuccess();
      onClose();
      reset("", {
        keepValues: false,
      });
      queryClient.invalidateQueries("projects");
    },
  });

  const onSubmit = (values) => {
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
          error={isError && error}
        >
          {buttonText}
        </AsyncButton>
      </form>
    </Modal>
  );
}

ProjectForm.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onMutate: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  initialValues: PropTypes.shape({
    projectName: PropTypes.string,
    projectDescription: PropTypes.string
  })
};

ProjectForm.defaultProps = {
  onSuccess: () => {},
  initialValues: {
    projectName: '',
    projectDescription: '',
  },
};
