import React, { useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { INSERT_VIDEO_COMMAND } from "./plugins/VideoPlugin";

export default function VideoRecorderBar() {
  const [editor] = useLexicalComposerContext();
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
  useEffect(() => {
    if (mediaBlobUrl) {
      // dispatch(setMediaBlobUrl(mediaBlobUrl));
      // dispatch(setMediaType(MediaTypes.VIDEO));
    }
  }, [mediaBlobUrl]);

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

  return (
    <div>
      <h3>Screen Recording</h3>
      <button onClick={handleStart}>start recording</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleResume}>resume recording</button>
      <button onClick={handleStop}>stop</button>
      <button onClick={isAudioMuted ? unMuteAudio : muteAudio}>mic off</button>
      <button onClick={()=>{
                
                editor.dispatchCommand(INSERT_VIDEO_COMMAND, {
                  altText: "Screen recording",
                  src: mediaBlobUrl
                })}}>
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
