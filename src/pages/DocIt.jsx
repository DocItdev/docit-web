import React from 'react';
import Grid from '@mui/material/Grid';
import DocumentContainer from '../components/DocumentContainer';
import Sidebar from '../components/Sidebar';
import useAuthEffect from '../hooks/useAuthEffect';
import Navbar from '../components/Navbar';

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
