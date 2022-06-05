import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Pause from '@mui/icons-material/Pause';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Stop from '@mui/icons-material/Stop';
import { useReactMediaRecorder } from "react-media-recorder";
import { useStopwatch } from "react-timer-hook";
import { useDispatch } from "react-redux";
import Timer from "../common/Timer";
import { setMediaBlobUrl, setMediaType } from "../../ducks";
import { MediaTypes } from "../../utils/common/constants";

export interface AudioRecorderBarProps {
  start: boolean;
  resetTriggerFeature: () => void;
}


export default function AudioRecorderBar({ start, resetTriggerFeature }: AudioRecorderBarProps) {
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl,
    clearBlobUrl,
  } = useReactMediaRecorder({
    audio: true,
    blobPropertyBag: { type: "audio/wav" },
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
      dispatch(setMediaType(MediaTypes.AUDIO));
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
    </Box>
  );
}
