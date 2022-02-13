import React from "react";
import { TextField, Button } from "@mui/material";
import Modal from "./common/Modal";

export default function CreateProjectModal({ open, onClose }) {
  return (
    <Modal title="Create Project" open={open} onClose={onClose}>
      <form>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="projectTitle"
          label="Title"
          name="projectTitle"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="projectDescription"
          label="Description"
          name="projectDescription"
          autoFocus
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Create
        </Button>
      </form>
    </Modal>
  );
}
