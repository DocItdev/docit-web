import React from "react";
import { TextField } from "@mui/material";
import { useDispatch } from 'react-redux';
import Modal from "./common/Modal";
import AsyncButton from "./common/AsyncButton";
import useAsyncForm from "../hooks/useAsyncForm";
import { setProject } from "../ducks/projects";

export default function CreateProjectModal({ open, onClose }) {
  const dispatch = useDispatch();
  const { register, handleAsyncSubmit, loading, asyncError } = useAsyncForm(
    '/api/projects',
    (data) => {
      dispatch(setProject(data.project));
      onClose();
    }
  );
  return (
    <Modal title="Create Project" open={open} onClose={onClose}>
      <form onSubmit={handleAsyncSubmit}>
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
          autoFocus
          {...register('description')}
        />
        <AsyncButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          loading={loading}
          error={asyncError}
        >
          Create
        </AsyncButton>
      </form>
    </Modal>
  );
}
