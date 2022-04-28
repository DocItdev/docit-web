import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Box, IconButton } from "@mui/material";
import {
  Pause,
  PlayArrow,
  Stop,
  MicOff,
  FiberManualRecord,
} from "@mui/icons-material";
import { useReactMediaRecorder } from "react-media-recorder";
import { useStopwatch } from "react-timer-hook";
import { useDispatch } from "react-redux";
import Timer from "../common/Timer";
import styles from "./Postbar.module.css";
import { setMediaBlobUrl, setMediaType } from "../../ducks";
import { MediaTypes } from "../../utils/common/constants";

export default function VideoRecorderBar({ start, resetTriggerFeature }) {
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
  } = useReactMediaRecorder({
    screen: true,
    blobPropertyBag: { type: "video/mp4" },
  });
  const [show, setShow] = useState(false);
  const {
    hours,
    minutes,
    seconds,
    start: startTimer,
    pause: pauseTimer,
    reset: resetTimer,
  } = useStopwatch({ autoStart: false });
  const dispatch = useDispatch();

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
      resetTriggerFeature();
    }
  }, [status]);

  useEffect(() => {
    if (status === "recording") {
      startTimer();
    }
  }, [status]);

  useEffect(() => {
    if (mediaBlobUrl) {
      dispatch(setMediaBlobUrl(mediaBlobUrl));
      dispatch(setMediaType(MediaTypes.VIDEO));
    }
  }, [mediaBlobUrl]);

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
    paddingLeft: "1rem",
    paddingRight: "1rem",
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
  };
  return !show ? (
    <div />
  ) : (
    <Box
      sx={{ backgroundColor: "#FBFBFB", display: "flex", flexDirection: "row" }}
    >
      <Box sx={buttonStyle}>
        <FiberManualRecord className={styles.dot} />
      </Box>
      <Box sx={buttonStyle}>
        <Timer hours={hours} minutes={minutes} seconds={seconds} />
      </Box>
      <Box sx={buttonStyle}>
        {status === "recording" ? (
          <IconButton onClick={handlePause} sx={{ color: "inherit" }}>
            <Pause />
          </IconButton>
        ) : (
          <IconButton onClick={handleResume} sx={{ color: "inherit" }}>
            <PlayArrow />
          </IconButton>
        )}
      </Box>
      <Box sx={buttonStyle}>
        <IconButton onClick={handleStop} sx={{ color: "inherit" }}>
          <Stop />
        </IconButton>
      </Box>
      <Box sx={buttonStyle}>
        <IconButton
          onClick={isAudioMuted ? unMuteAudio : muteAudio}
          sx={{ color: isAudioMuted ? "red" : "inherit" }}
        >
          <MicOff />
        </IconButton>
      </Box>
    </Box>
  );
}

VideoRecorderBar.propTypes = {
  start: PropTypes.bool.isRequired,
  setOpen: PropTypes.func,
};

VideoRecorderBar.defaultProps = {
  setOpen: () => {},
};
