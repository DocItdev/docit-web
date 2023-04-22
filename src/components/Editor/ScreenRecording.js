import React, { useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { INSERT_VIDEO_COMMAND } from "./plugins/VideoPlugin";
import useFileUpload from "../../hooks/useFileUpload";

export default function VideoRecorderBar() {
  const [editor] = useLexicalComposerContext();
  const {
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
  const { upload, isLoading, error, isError } = useFileUpload();

  const handlePause = () => {
    pauseRecording();
  };

  const handleResume = () => {
    resumeRecording();
  };

  const handleStop = () => {
    stopRecording();
  };

  const handleStart = () => {
    clearBlobUrl();
    startRecording();
  };

  const handleSave = (e) => {
    e.stopPropagation();
    const body = {
      fileUrl: mediaBlobUrl,
      fileName: 'Screen recording'
    };
    upload(body, {
      onSuccess: (data) => {
        editor.dispatchCommand(INSERT_VIDEO_COMMAND, {
          altText: "Screen recording",
          src: data.url,
          fileKey: data.key,
          width: "800",
          height: "600"
        })
      }
    })
  }

  return (
    <div>
      <h3>Screen Recording</h3>
      <button onClick={handleStart}>start recording</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleResume}>resume recording</button>
      <button onClick={handleStop}>stop</button>
      <button onClick={isAudioMuted ? unMuteAudio : muteAudio}>mic off</button>
      <button onClick={handleSave}>
        save
      </button>

      {mediaBlobUrl?(
        <video controls width="100%" height="70%">
          <source src={mediaBlobUrl} type="video/mp4" />
        </video>
      ) : (<div>click start recording</div>)}
    </div>
  );
}
