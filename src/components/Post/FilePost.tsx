import useFile from "../../hooks/useFile";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import Loader from "../common/Loader";

export interface FilePostProps {
  filePath: string;
}

export default function FilePost({ filePath }: FilePostProps) {
  const { mediaDownloadUrl, isLoading, Metadata } = useFile(filePath);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Grid container alignItems="center" justifyContent="center">
      <a href={mediaDownloadUrl} target="_blank" download>
        <Grid item>
          <CardContent>
            <FilePresentIcon style={{ color: "#1F5980", fontSize: "35px" }} />
            {Metadata?.originalname}
          </CardContent>
        </Grid>
      </a>
    </Grid>
  );
}
