import { useSelector, useDispatch } from "react-redux";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Cancel from "@mui/icons-material/Cancel";
import { setMediaBlobUrl } from "../../ducks";
import { RootState } from "../../config/reduxConfig";
import React from "react";

export default function VideoPreview() {
  const mediaBlobUrl: string = useSelector((state: RootState) => state.mediaBlobUrl);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(setMediaBlobUrl(''));
  }

  return mediaBlobUrl ? (
    <Card
      component={Grid}
      item
      xs={6}
      sx={{ margin: "1rem" }}
      variant="outlined"
    >
      <CardActions disableSpacing>
        <IconButton onClick={handleDelete} sx={{ marginLeft: "auto" }}>
          <Cancel />
        </IconButton>
      </CardActions>
      <CardContent>
        <video controls width="100%" height="100%">
          <source src={mediaBlobUrl} type="video/mp4" />
        </video>
      </CardContent>
    </Card>
  ) : (
    <span />
  );
}
