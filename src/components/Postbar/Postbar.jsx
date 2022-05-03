import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import createPost from "../../utils/posts/createPost";
import DocItEditor from "../common/DocItEditor/DocItEditor";
import MediaBar from "./MediaBar";
import RecorderBar from "./RecorderBar";
import MediaPreview from "../MediaPreview";
import uploadMediaFile from "../../utils/mediaStorage/uploadMediaFile";
import { setMediaBlobUrl } from "../../ducks";
import SnipBar from "./SnipBar";
import { MediaFeatures } from "../../utils/common/constants";
import FileUploadBar from "./FileUploadBar";

export default function PostBar() {
  const { userToken, selectedDocId, mediaBlobUrl, mediaType } = useSelector((state) => state);
  const [featureTrigger, setFeatureTrigger] = useState(MediaFeatures.NONE);
  const [featurePreview, setFeaturePreview] = useState(MediaFeatures.NONE);
  const dispatch = useDispatch();


  const handleMutation = async (postData) => {
    if (mediaBlobUrl) {
      const { path } = await uploadMediaFile(userToken, mediaBlobUrl);
      postData.mediaFilePath = path;
      postData.postType = mediaType;
    }
    console.log(postData)
    return createPost(userToken, selectedDocId, postData);
  }

  const featureData = [
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
    },
    {
      featureName: "Diagram Maker",
      featureDescription: "Make a diagram",
      icon: "bi bi-diagram-2",
    },
    {
      featureName: "ScreenShot",
      featureDescription:
        "Take a screenshot and edit it just like the snipping tool",
      icon: "bi bi-scissors",
      onClick: () => {
        setFeaturePreview(MediaFeatures.SCREEN_SNIP);
        setFeatureTrigger(MediaFeatures.SCREEN_SNIP);
      }
    },
    {
      featureName: "Upload Files",
      featureDescription:
        "Upload Files of any size and any type and preview them here",
      icon: "bi bi-file-arrow-up",
      onClick: () => {
        setFeaturePreview(MediaFeatures.UPLOAD_FILE);
        setFeatureTrigger(MediaFeatures.UPLOAD_FILE);
      }
    },
  ];
  return (
    <Paper elevation={4}>
      <RecorderBar start={featureTrigger === MediaFeatures.SCREEN_REC} resetTriggerFeature={() => setFeatureTrigger(MediaFeatures.NONE)} />
      <SnipBar start={featureTrigger === MediaFeatures.SCREEN_SNIP} resetTriggerFeature={() => setFeatureTrigger(MediaFeatures.NONE)} />
      <FileUploadBar  start={featureTrigger === MediaFeatures.UPLOAD_FILE} resetTriggerFeature={() => setFeatureTrigger(MediaFeatures.NONE)}/>

      <Grid style={{ paddingLeft: "5px" }} container spacing={0}>
        <MediaBar features={featureData} />
      </Grid>
      <DocItEditor
        onMutate={handleMutation}
        onSuccess={() => dispatch(setMediaBlobUrl(''))}
        alwaysFocused={true}
        renderPreview={() => <MediaPreview type={featurePreview} />}
      />
    </Paper>
  );
}
