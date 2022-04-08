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
import { setVideoBlobUrl } from "../../ducks";

export default function VideoPreview() {
  const videoBlobUrl = useSelector((state) => state.videoBlobUrl);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(setVideoBlobUrl(''))
  }

  return videoBlobUrl ? (
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
          <source src={videoBlobUrl} type="video/mp4" />
        </video>
      </CardContent>
    </Card>
  ) : (
    <span />
  );
}
