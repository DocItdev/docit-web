import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import DocumentContainer from '../components/DocumentContainer';
import Sidebar from '../components/Sidebar';
import useAuthEffect from '../hooks/useAuthEffect';

export default function DocIt() {
  useAuthEffect();
  //
  return (
    <div >
      <Box sx={{ flexGrow: 1 }}>
      <h3>DocIt main page</h3>
        <Grid container >
          <Grid item xs={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={10}>
          <DocumentContainer/>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
