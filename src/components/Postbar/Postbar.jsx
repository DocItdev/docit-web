import React from "react";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import CardContent from '@mui/material/CardContent';
import createPost from "../../utils/posts/createPost";
import DocItEditor from "../common/DocItEditor/DocItEditor";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

export default function PostBar() {
  const { userToken, selectedDocId } = useSelector((state) => state);

  const featureData = {
    FEATURES: [
      { featureName: "Screen Recording", featureDescription: "Record your screen", icon: "bi bi-camera-video" },
      { featureName: "Voice Recording", featureDescription: "Record your voice", icon: "bi bi-mic" },
      { featureName: "Diagram Maker", featureDescription: "Make a diagram", icon: "bi bi-diagram-2" },
      { featureName: "ScreenShot", featureDescription: "Take a screenshot and edit it just like the snipping tool", icon: "bi bi-scissors" },
      { featureName: "Upload Files", featureDescription: "Upload Files of any size and any type and preview them here", icon: "bi bi-file-arrow-up" }
    ]
  }

  const featureFactory = (featureArray) => {
    const retArray = [];
    for (let i = 0; i < featureArray.length; i++) {
      retArray.push(
        <Grid item>
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <button className="btn-lg" variant="contained" {...bindTrigger(popupState)}
                  style={{
                    borderRadius: "5px",
                    borderWidth: "0px",
                    margin: "0px 1px 0px 1px",
                    background: "transparent"
                  }}
                >

                  <i class={featureArray[i].icon}></i>

                </button>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <Card sx={{ minWidth: 275, maxWidth: 275, padding:"15px" }}>
                    <Typography variant="h5" component="div">
                      {featureArray[i].featureName}
                    </Typography>
                    <Typography sx={{ p: 2 }}>{featureArray[i].featureDescription}</Typography>
                  </Card>

                </Popover>
              </div>
            )}
          </PopupState>
        </Grid>
      )

    }
    return retArray;
  }

  const featurePopover = featureFactory(featureData.FEATURES);

  return (
    <Paper elevation={4}>
      <Grid style={{ paddingLeft: "5px" }} container spacing={0}>
        {featurePopover}
      </Grid>
      <DocItEditor
        onMutate={(newPost) => createPost(userToken, selectedDocId, newPost)}
        alwaysFocused={true}
      />
    </Paper>
  );
}
