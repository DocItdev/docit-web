import React, { useState } from "react";
import { TreeItem } from "@mui/lab";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import getTreeNodeId from "../utils/getTreeNodeId";
import Modal from "./common/Modal";
import styles from '../styles/ProjectTreeItem.module.css';

export default function ProjectTreeItem({ projectName, children, ...props }) {
  const [opened, setOpened] = useState(false);

  const toggleOpened = () => {
    setOpened(!opened);
  };
  return (
    <TreeItem
      {...props}
      nodeId={getTreeNodeId()}
      label={
        <Box>
          <Typography component="span">{projectName}</Typography>
          <IconButton className={styles.addButton} onClick={toggleOpened}>
            <i className="bi bi-plus-circle"></i>
          </IconButton>
          <Modal title="Create Document" open={opened} onClose={toggleOpened}>
            <form>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="docTitle"
                label="Title"
                name="docTitle"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="docDescription"
                label="Description"
                name="docDescription"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Create
              </Button>
            </form>
          </Modal>
        </Box>
      }
    >
      {children}
      <Button onClick={toggleOpened}>
        <i className="bi bi-plus"></i>
        <Typography component="span">
          New Document
        </Typography>
      </Button>
    </TreeItem>
  );
}
