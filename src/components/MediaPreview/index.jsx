import React from "react";
import PropTypes from 'prop-types';
import VideoPreview from "./VideoPreview";

export default function MediaPreview({ type, ...props }) {
  const renderPreview = () => {
    switch (type) {
      case "video":
        return <VideoPreview {...props} />;
      default:
        return <span />;
    }
  };
  return <>{renderPreview()}</>;
}

MediaPreview.propTypes = {
  type: PropTypes.string.isRequired,
};
