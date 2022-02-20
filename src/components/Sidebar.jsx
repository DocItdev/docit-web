import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import ProjectTreeView from './ProjectTreeView';
import styles from '../styles/Sidebar.module.css';
import CreateProjectModal from './CreateProjectModal';
import useProjects from '../hooks/useProjects';
import Loader from './common/Loader';

export default function Sidebar() {
  const [opened, setOpened] = useState(false);
  const { projects, loading } = useProjects();

  const toggleOpened = () => {
    setOpened(!opened);
  };
  if(loading) {
    return <Loader />
  }
  return (
    <aside className={styles.sidebar}>
      <Button onClick={toggleOpened}>
      <i className="bi bi-plus"></i>
        <Typography component="span">
          New Project
        </Typography>
      </Button>
      <ProjectTreeView projects={projects} />
      <CreateProjectModal open={opened} onClose={toggleOpened} />
    </aside>
  );
}