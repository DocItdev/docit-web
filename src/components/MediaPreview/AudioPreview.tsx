import { useSelector, useDispatch } from "react-redux";
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Cancel from "@mui/icons-material/Cancel";
import { setMediaBlobUrl } from "../../ducks";
import { RootState } from "../../config/reduxConfig";

export default function AudioPreview() {
  const mediaBlobUrl: string = useSelector((state: RootState) => state.mediaBlobUrl);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(setMediaBlobUrl(""));
  };

  return mediaBlobUrl ? (
    <Card
      component={Grid}
      item
      xs={3}
      sx={{ margin: "1rem", paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
      variant="outlined"
    >
      <Grid item xs={12} sx={{ display: "flex" }}>
        <IconButton onClick={handleDelete} sx={{ marginLeft: "auto" }}>
          <Cancel />
        </IconButton>
      </Grid>
      <Grid xs={12} sx={{ display: "flex" }}>
        <audio controls>
          <source src={mediaBlobUrl} type="audio/wav" />
        </audio>
      </Grid>
    </Card>
  ) : (
    <span />
  );
}
