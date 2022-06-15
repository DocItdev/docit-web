import Grid from "@mui/material/Grid";
import useFile from "../../hooks/useFile";
import Loader from "../common/Loader";

export interface AudioPostProps {
  filePath: string;
}

export default function AudioPost({ filePath }: AudioPostProps) {
  const { mediaDownloadUrl, isLoading } = useFile(filePath);
  return isLoading ? (
    <Loader />
  ) : (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item>
        <audio id={filePath} preload="metadata" controls>
          <source src={mediaDownloadUrl} type="audio/wav" />
        </audio>
      </Grid>
    </Grid>
  );
}
