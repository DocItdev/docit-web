import React, { useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { INSERT_VIDEO_COMMAND } from "./plugins/VideoPlugin";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Pause from "@mui/icons-material/Pause";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Stop from "@mui/icons-material/Stop";
import MicOff from "@mui/icons-material/MicOff";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import { useStopwatch } from "react-timer-hook";
import Timer from "../common/Timer";
import Button from "@mui/material/Button";

import "./Postbar.css";

export default function VideoRecorderBar() {
  const [editor] = useLexicalComposerContext();
  const [recording, setRecording] = useState(false);
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

  const {
    hours,
    minutes,
    seconds,
    start: startTimer,
    pause: pauseTimer,
    reset: resetTimer,
  } = useStopwatch({ autoStart: false });


  useEffect(() => {
    pauseTimer();
    if (status === "recording") {
      startTimer();
    }
  }, [status]);

  const handlePause = () => {
    pauseRecording();
    pauseTimer();
  };

  const handleResume = () => {
    resumeRecording();
    startTimer();
  };

  const handleStop = () => {
    resetTimer();
    setRecording(!recording);
    stopRecording();
  };

  const handleStart = () => {
    setRecording(!recording);
    clearBlobUrl();
    startRecording();
  };

  const buttonStyle = {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
  };

  return (
    <div>
    
      <Box
        sx={{
          backgroundColor: "#FBFBFB",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box 
        sx={{
          backgroundColor: "#FBFBFB",
          display: "flex",
          flexDirection: "row",
        }}
        >
        {recording ? (
          <>
          
            <Box sx={buttonStyle}>
              <FiberManualRecord className={ status === "recording" ? 'dot' : ""}/>
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
          </>
        ) : (
          <Box>
            <Button onClick={handleStart}>start recording</Button>
          </Box>
        )}

        {mediaBlobUrl && (
          <Button
            onClick={() => {
              editor.dispatchCommand(INSERT_VIDEO_COMMAND, {
                altText: "Screen recording",
                src: mediaBlobUrl,
                width: "800",
                height: "600",
              });
            }}
          >
            save
          </Button>
        )}
        </Box>
        
        {mediaBlobUrl && (
        <video controls style={{maxHeight:"600px"}} >
          <source src={mediaBlobUrl} type="video/mp4" />
        </video>
      ) }
      </Box>

      
    </div>
  );
}
