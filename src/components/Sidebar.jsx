import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import ProjectTreeView from './ProjectTreeView';
import styles from '../styles/Sidebar.module.css';
import CreateProjectModal from './CreateProjectModal';

export default function Sidebar() {
  const [opened, setOpened] = useState(false);

  const toggleOpened = () => {
    setOpened(!opened);
  };
  return (
    <aside className={styles.sidebar}>
      <Button onClick={toggleOpened}>
      <i className="bi bi-plus"></i>
        <Typography component="span">
          New Project
        </Typography>
      </Button>
      <ProjectTreeView />
      <CreateProjectModal open={opened} onClose={toggleOpened} />
    </aside>
  );
}