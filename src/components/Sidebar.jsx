import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import ProjectTreeView from './ProjectTreeView';
import styles from '../styles/Sidebar.module.css';
import CreateProjectModal from './CreateProjectModal';
import Loader from './common/Loader';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import fetchAllProjects from '../utils/fetchAllProjects';

export default function Sidebar() {
  const [opened, setOpened] = useState(false);
  const userToken = useSelector(state => state.users.token);
  const { isLoading, data } = useQuery('projects', () => fetchAllProjects(userToken))

  const toggleOpened = () => {
    setOpened(!opened);
  };

  if(isLoading) {
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
      <ProjectTreeView projects={data.projects} />
      <CreateProjectModal open={opened} onClose={toggleOpened} />
    </aside>
  );
}