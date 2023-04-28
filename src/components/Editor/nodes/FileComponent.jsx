import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import PropTypes from "prop-types";
import useFile from "../../../hooks/useFile";

export default function FileComponent({ name, url }) {
  const { data } = useFile();
  return (
    <Card
      component={Grid}
      item
      xs={12}
      sx={{ margin: "1rem" }}
      variant="outlined"
    >
      <CardContent>
        <FilePresentIcon style={{ color: "#1F5980", fontSize: "35px" }} />
        <p>{name}</p>
        <FilePresentIcon style={{ color: "#1F5980", fontSize: "35px" }} />
        {data?.mediaDownloadUrl ? (
          <a
            href={data.mediaDownloadUrl}
            target="_blank"
            rel="noreferrer"
            download
          >
            {name}
          </a>
        ) : (
          <a href={url} target="_blank" rel="noreferrer" download>
            {name}
          </a>
        )}
      </CardContent>
    </Card>
  );
}

FileComponent.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
