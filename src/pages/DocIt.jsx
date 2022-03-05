import React from 'react';
import Grid from '@mui/material/Grid';
import DocumentContainer from '../components/DocumentContainer/DocumentContainer';
import Sidebar from '../components/Sidebar/Sidebar';
import useAuthEffect from '../hooks/useAuthEffect';
import Navbar from '../components/Navbar/Navbar';

export default function DocIt() {
  useAuthEffect();
  return (
      <Grid container >
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <DocumentContainer/>
        </Grid>
      </Grid>
  )
}
