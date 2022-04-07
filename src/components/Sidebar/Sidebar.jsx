import React, { useState } from 'react';
import { Button, Typography, Grid } from '@mui/material';
import ProjectTreeView from '../ProjectTreeView';
import styles from './Sidebar.module.css';
import ProjectForm from '../common/ProjectForm';
import Loader from '../common/Loader';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import fetchAllProjects from '../../utils/projects/fetchAllProjects';
import postProject from '../../utils/projects/postProject';


export default function Sidebar() {
  const [opened, setOpened] = useState(false);
  const userToken = useSelector(state => state.userToken);
  const { isLoading, data } = useQuery('projects', () => fetchAllProjects(userToken), {
    enabled: userToken !== undefined || userToken !== '' || userToken !== null,
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
      <ProjectForm
        open={opened}
        onClose={toggleOpened}
        onMutate={newProject => postProject(userToken, newProject)}
        title="CreateProject"
        buttonText="Create"
      />
    </div>
  );
}