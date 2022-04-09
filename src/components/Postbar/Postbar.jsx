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
import { setVideoBlobUrl } from "../../ducks";

export default function PostBar() {
  const { userToken, selectedDocId, videoBlobUrl } = useSelector((state) => state);
  const [openVideo, setOpenVideo] = useState(false);
  const dispatch = useDispatch();

  const handleMutation = async (postData) => {
    if (videoBlobUrl) {
      const { path } = await uploadMediaFile(userToken, videoBlobUrl);
      postData.mediaFilePath = path;
      postData.postType = 'video';
    }
    console.log(postData)
    return createPost(userToken, selectedDocId, postData);
  }

  const featureData = [
    {
      featureName: "Screen Recording",
      featureDescription: "Record your screen",
      icon: "bi bi-camera-video",
      onClick: () => setOpenVideo(true),
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
    },
    {
      featureName: "Upload Files",
      featureDescription:
        "Upload Files of any size and any type and preview them here",
      icon: "bi bi-file-arrow-up",
    },
  ];
  return (
    <Paper elevation={4}>
      <RecorderBar start={openVideo} setOpen={value => setOpenVideo(value)} />
      <Grid style={{ paddingLeft: "5px" }} container spacing={0}>
        <MediaBar features={featureData} />
      </Grid>
      <DocItEditor
        onMutate={handleMutation}
        onSuccess={() => dispatch(setVideoBlobUrl(''))}
        alwaysFocused={true}
        renderPreview={() => <MediaPreview type="video" />}
      />
    </Paper>
  );
}
