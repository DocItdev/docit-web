import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import {  Box, IconButton } from "@mui/material";
import { Pause, PlayArrow, Stop, MicOff, FiberManualRecord } from "@mui/icons-material";
import { useReactMediaRecorder } from "react-media-recorder";
import { useStopwatch } from "react-timer-hook";
import Timer from "../common/Timer";
import styles from './Postbar.module.css'

export default function RecorderBar({ start, setOpen }) {
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl,
    clearBlobUrl,
    muteAudio,
    unMuteAudio,
    isAudioMuted,
  } = useReactMediaRecorder({ screen: true });
  const [show, setShow] = useState(false);
  const {
    hours,
    minutes,
    seconds,
    start: startTimer,
    pause: pauseTimer,
    reset: resetTimer,
  } = useStopwatch({ autoStart: false });

  const visibleStates = ["recording", "paused"];

  useEffect(() => {
    const handleStart = () => {
      clearBlobUrl();
      startRecording();
    };
    if (start) {
      handleStart();
    }
  }, [start]);

  useEffect(() => {
    if (visibleStates.includes(status)) {
      setShow(true);
    } else {
      setShow(false);
      setOpen(false);
    }
  }, [status]);

  useEffect(() => {
    if (status === 'recording') {
      startTimer();
    }
  }, [status])

  const handlePause = () => {
    pauseRecording();
    pauseTimer();
  };

  const handleResume = () => {
    resumeRecording();
    startTimer();
  };

  const handleStop = () => {
    stopRecording();
    resetTimer();
  };
  const buttonStyle = {
    paddingLeft: '1rem',
    paddingRight: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
  };
  return !show ? (
    <div />
  ) : (
    < Box sx={{ backgroundColor: "#FBFBFB", display: 'flex', flexDirection: 'row' }}>
      < Box sx={buttonStyle}>
        <FiberManualRecord className={styles.dot} />
      </ Box>
      < Box sx={buttonStyle}>
       <Timer hours={hours} minutes={minutes} seconds={seconds} />
      </ Box>
      < Box sx={buttonStyle}>
        {status === "recording" ? (
          <IconButton onClick={handlePause} sx={{ color: "inherit" }}>
            <Pause />
          </IconButton>
        ) : (
          <IconButton onClick={handleResume} sx={{ color: "inherit" }}>
            <PlayArrow />
          </IconButton>
        )}
      </ Box>
      < Box sx={buttonStyle}>
        <IconButton onClick={handleStop} sx={{ color: "inherit" }}>
          <Stop />
        </IconButton>
      </ Box>
      < Box sx={buttonStyle}>
        <IconButton
          onClick={isAudioMuted ? unMuteAudio : muteAudio}
          sx={{ color: isAudioMuted ? "red" : "inherit" }}
        >
          <MicOff />
        </IconButton>
      </ Box>
    </ Box>
  );
}

RecorderBar.propTypes = {
  start: PropTypes.bool.isRequired,
  setOpen: PropTypes.func,
};

RecorderBar.defaultProps = {
  setOpen: () => {},
};
