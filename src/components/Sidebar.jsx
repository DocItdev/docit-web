import React, { useState } from 'react';
import { Button, Typography, Grid } from '@mui/material';
import ProjectTreeView from './ProjectTreeView';
import styles from '../styles/Sidebar.module.css';
import CreateProjectModal from './CreateProjectModal';
import Loader from './common/Loader';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import fetchAllProjects from '../utils/projects/fetchAllProjects';


export default function Sidebar() {
  const [opened, setOpened] = useState(false);
  const userToken = useSelector(state => state.userToken);
  const { isLoading, data } = useQuery('projects', () => fetchAllProjects(userToken), {
    refetchOnWindowFocus: false
  })

  const toggleOpened = () => {
    setOpened(!opened);
  };

  if(isLoading) {
    return <Loader />
  }
  return (
    <Grid item xs={3} className={styles.sidebar}>
      <Button variant="outlined" className={styles.newProjectButton} onClick={toggleOpened}>
        <Typography component="span">
          New Project
        </Typography>
      </Button>
      <ProjectTreeView projects={data.projects} />
      <CreateProjectModal open={opened} onClose={toggleOpened} />
    </Grid>
  );
}