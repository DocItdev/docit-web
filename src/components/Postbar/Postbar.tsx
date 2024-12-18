import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import createPost from "../../utils/posts/createPost";
import DocItEditor from "../common/DocItEditor/DocItEditor";
import MediaBar from "./MediaBar";
import VideoRecorderBar from "./VideoRecorderBar";
import MediaPreview from "../MediaPreview";
import uploadMediaFile from "../../utils/mediaStorage/uploadMediaFile";
import { setMediaBlobUrl, setFileName, setMediaType } from "../../ducks";
import SnipBar from "./SnipBar";
import { MediaFeatures } from "../../utils/common/constants";
import AudioRecorderBar from "./AudioRecorderBar";
import { RootState } from "../../config/reduxConfig";
import { PostType } from "../../@types/Post";
import { Feature } from "../../@types/Feature";
import { useParams } from "react-router-dom";

export default function PostBar() {

  const { userToken, mediaBlobUrl, mediaType, fileName } =
    useSelector((state: RootState) => state);

  const [featureTrigger, setFeatureTrigger] = useState<MediaFeatures>(MediaFeatures.NONE);
  const [featurePreview, setFeaturePreview] = useState<MediaFeatures>(MediaFeatures.NONE);
  const dispatch = useDispatch();
  const { docId: selectedDocId } = useParams()

  const handleMutation = async (postData: PostType) => {
    if (mediaBlobUrl) {
      const { path } = await uploadMediaFile(userToken, mediaBlobUrl, fileName);
      postData.mediaFilePath = path;
      postData.postType = mediaType;
    }
    return createPost(userToken, selectedDocId, postData);
  };

  const featureData: Feature[] = [
    {
      featureName: "Screen Recording",
      featureDescription: "Record your screen",
      icon: "bi bi-camera-video",
      onClick: () => {
        setFeaturePreview(MediaFeatures.SCREEN_REC);
        setFeatureTrigger(MediaFeatures.SCREEN_REC);
      },
    },
    {
      featureName: "Voice Recording",
      featureDescription: "Record your voice",
      icon: "bi bi-mic",
      onClick: () => {
        setFeaturePreview(MediaFeatures.VOICE_REC);
        setFeatureTrigger(MediaFeatures.VOICE_REC);
      },
    },
    {
      featureName: "ScreenShot",
      featureDescription:
        "Take a screenshot and edit it just like the snipping tool",
      icon: "bi bi-scissors",
      onClick: () => {
        setFeaturePreview(MediaFeatures.SCREEN_SNIP);
        setFeatureTrigger(MediaFeatures.SCREEN_SNIP);
      },
    },
    {
      featureName: "Upload Files",
      featureDescription:
        "Upload Files of any size and any type and preview them here",
      icon: "bi bi-paperclip",
      onClick: () => {
        setFeaturePreview(MediaFeatures.UPLOAD_FILE);
        setFeatureTrigger(MediaFeatures.UPLOAD_FILE);
      }
    },
    {
      featureName: "Diagram Maker",
      featureDescription: "Coming Soon! :) ",
      icon: "bi bi-diagram-2",
    },
  ];

  const clearMediaState = async () => {
    dispatch(setMediaBlobUrl(""))
    dispatch(setFileName(undefined));
    dispatch(setMediaType(''));
  }
  return (
    <Paper elevation={4}>
      <VideoRecorderBar
        start={featureTrigger === MediaFeatures.SCREEN_REC}
        resetTriggerFeature={() => setFeatureTrigger(MediaFeatures.NONE)}
      />
      <SnipBar
        start={featureTrigger === MediaFeatures.SCREEN_SNIP}
        resetTriggerFeature={() => setFeatureTrigger(MediaFeatures.NONE)}
      />

      <AudioRecorderBar 
        start={featureTrigger === MediaFeatures.VOICE_REC}
        resetTriggerFeature={() => setFeatureTrigger(MediaFeatures.NONE)}
        />

      <Grid style={{ paddingLeft: "5px" }} container spacing={0}>
        <MediaBar features={featureData} />
      </Grid>
      <MediaPreview type={featurePreview} />
      <DocItEditor
        onMutate={handleMutation}
        onSuccess={clearMediaState}
        alwaysFocused={true}

      />
    </Paper>
  );
}
