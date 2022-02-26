import React from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from 'react-redux';
import Modal from "./common/Modal";
import AsyncButton from "./common/AsyncButton";
import postProject from "../utils/projects/postProject";

export default function CreateProjectModal({ open, onClose }) {
  const userToken = useSelector(state => state.userToken);
  const { register, handleSubmit, reset} = useForm();
  const queryClient = useQueryClient();
  const { isLoading, isError, error, mutate } = useMutation(
    newProject => postProject(userToken, newProject), {
    onSuccess: () => {
      queryClient.invalidateQueries('projects');
    }
  });

  const onSubmit = (values) => {
    mutate(values);
    onClose();
    reset('', {
      keepValues: false,
    });
  }
  
  return (
    <Modal title="Create Project" open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="projectName"
          label="Name"
          autoFocus
          {...register('name')}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="projectDescription"
          label="Description"
          {...register('description')}
        />
        <AsyncButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          loading={isLoading}
          error={isError && error}
        >
          Create
        </AsyncButton>
      </form>
    </Modal>
  );
}
