import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton, Typography } from '@mui/material';
import { useReactMediaRecorder } from "react-media-recorder";

export default function RecorderBar({ start }) {
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl,
    clearBlobUrl
  } = useReactMediaRecorder({ screen: true });

  useEffect(() => {
    if(start) {
      clearBlobUrl();
      startRecording();
    }
  },[start]);
  if(mediaBlobUrl) {
    return <video src={mediaBlobUrl} controls autoPlay loop width={600} height={300} />
  }
  return(
    <Grid  sx={{ backgroundColor: '#FBFBFB' }}>
      <Grid item xs={2}>
        <Typography>
          {status}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={pauseRecording}>
          pause
        </IconButton>
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={stopRecording}>
          stop
        </IconButton>
      </Grid>
    </Grid>
  );
}

RecorderBar.propTypes = {
  start: PropTypes.bool.isRequired,
};
