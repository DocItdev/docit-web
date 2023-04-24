import React from "react";
import PropTypes from "prop-types";
import useFile from "../../../hooks/useFile";

export default function VideoSourceComponent({ src, fileKey }) {
  const { data } = useFile(fileKey);
  return (
    <>
      {data?.mediaDownloadUrl ? (
        <source src={data.mediaDownloadUrl} type="video/mp4" />
      ) : (
        <source src={src} type="video/mp4" />
      )}
    </>
  );
}

VideoSourceComponent.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  fileKey: PropTypes.string.isRequired,
};
