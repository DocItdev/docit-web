import React, { useState } from 'react';
import { Button, Typography, Grid } from '@mui/material';
import ProjectTreeView from '../ProjectTreeView';
import styles from './Sidebar.module.css';
import CreateProjectModal from '../CreateProjectModal';
import Loader from '../common/Loader';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import fetchAllProjects from '../../utils/projects/fetchAllProjects';


export default function Sidebar() {
  const [opened, setOpened] = useState(false);
  const userToken = useSelector(state => state.userToken);
  const { isLoading, data } = useQuery('projects', () => fetchAllProjects(userToken), {
    enabled: userToken !== undefined || userToken !== '',
  })

  const toggleOpened = () => {
    setOpened(!opened);
  };

  if(isLoading) {
    return <Loader />
  }
  return (
    <div className={styles.sidebar}>
      <Button variant="outlined" className={styles.newProjectButton} onClick={toggleOpened}>
        <Typography component="span">
          New Project
        </Typography>
      </Button>
      <ProjectTreeView projects={data.projects} />
      <CreateProjectModal open={opened} onClose={toggleOpened} />
    </div>
  );
}