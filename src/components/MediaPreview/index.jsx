import React from "react";
import PropTypes from 'prop-types';
import VideoPreview from "./VideoPreview";
import { MediaFeatures } from "../../utils/common/constants";
import SnipPreview from "./SnipPreview";

export default function MediaPreview({ type, ...props }) {
  const renderPreview = () => {
    switch (type) {
      case MediaFeatures.SCREEN_REC:
        return <VideoPreview {...props} />;
      case MediaFeatures.SCREEN_SNIP:
        return <SnipPreview />
      default:
        return <span />;
    }
  };
  return <>{renderPreview()}</>;
}

MediaPreview.propTypes = {
  type: PropTypes.string.isRequired,
};
