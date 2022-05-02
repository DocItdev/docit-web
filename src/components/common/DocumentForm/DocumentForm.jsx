import React from "react";
import { TextField } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import Modal from "../Modal";
import AsyncButton from "../AsyncButton";

export default function DocumentForm({
  open,
  buttonText,
  title,
  onClose,
  onMutate,
  onSuccess,
  initialValues,
}) {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const { isLoading, isError, error, mutate } = useMutation(onMutate, {
    onSuccess: () => {
      queryClient.invalidateQueries("projects");
      onClose();
      reset({
        keepValues: false,
        keepErrors: false,
      });
    },
  });

  const onSubmit = (values) => {
    mutate(values);
  };
  return (
    <Modal
      onClick={(event) => event.stopPropagation()}
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
          error={isError && error}
        >
          {buttonText}
        </AsyncButton>
      </form>
    </Modal>
  );
}

DocumentForm.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onMutate: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  initialValues: PropTypes.shape({
    title: PropTypes.string,
  }),
};

DocumentForm.defaultProps = {
  onSuccess: () => {},
  initialValues: {
    title: "",
  },
};
