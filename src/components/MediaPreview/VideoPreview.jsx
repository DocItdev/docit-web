import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IconButton,
  Card,
  CardActions,
  CardContent,
  Grid,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { setMediaBlobUrl } from "../../ducks";

export default function VideoPreview() {
  const mediaBlobUrl = useSelector((state) => state.mediaBlobUrl);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(setMediaBlobUrl(''))
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
